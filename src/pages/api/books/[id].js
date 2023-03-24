import {connect, model, models, Schema} from "mongoose"
const connectionString = "mongodb+srv://user1:bookstoreUser1@bookstorems.qgl1qca.mongodb.net/bookstore"

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method", req.method)
    console.log("req.params.id", req.query)

    const isbn = req.query.id

    //Get only one document
    if (req.method === 'GET') {
        try{
            const doc = await Book.findOne({ isbn : isbn })
            res.status(200).json(doc)
        } catch (err) {
            console.log(`err: ${err}`);
        }
    } 
    
    else if (req.method === 'PUT') {
        try{
            const updatedDoc = await Book.updateOne({ isbn : isbn }, req.body)
            console.log(`updatedDoc: ${JSON.stringify(updatedDoc)}`)
            res.status(200).json(updatedDoc)
        } catch (err) {
            console.log(`err: ${err}`);
        }
    }

    else if (req.method === 'POST') {
        try{
            req.body._id = isbn;
            const newDoc = await Book.create(req.body);
            console.log(`newDoc: ${newDoc}`)
            res.status(200).json(newDoc);
        } catch (err) {
            console.log(`err: ${err}`);
        }

    }

    else if (req.method === 'DELETE') {
        try{
            const deletedDoc = await Book.deleteOne({ isbn : isbn })
            console.log(`deletedDoc: ${JSON.stringify(deletedDoc)}`)
            res.status(200).json(deletedDoc)
        } catch (err) {
            console.log(`err: ${err}`);
        }
    } 

    else {
        res.setHeader('Allow', ['GET', 'DELETE', 'PUT', 'POST'])
        res.status(405).send(`Method ${req.method} Not Allowed`)
    }
}
const bookSchema = new Schema({
    title: String,
    author: String,
    year: String,
    image: String,
    isbn: String,
    price: Number
})

const Book = models?.book || model('book', bookSchema);