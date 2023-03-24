import {connect, model, models, Schema} from "mongoose"
const connectionString = "mongodb+srv://user1:bookstoreUser1@bookstorems.qgl1qca.mongodb.net/bookstore"

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method", req.method)

    if (req.method === 'GET') {
        const docs = await Book.find().sort({title: 1})
        res.status(200).json(docs)
    } 
    
    else if (req.method === 'POST') {
        req.body._id = req.body.isbn + req.body.year;
        const newDoc = await Book.create(req.body);
        console.log(`newDoc: ${newDoc}`)
        res.status(200).json(newDoc);
    } 
    
    else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
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
