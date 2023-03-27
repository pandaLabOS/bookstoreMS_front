import {connect, model, models, Schema} from "mongoose"
const connectionString = "mongodb+srv://user1:bookstoreUser1@bookstorems.qgl1qca.mongodb.net/bookstore"

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("/api/authors req.method", req.method)
    console.log("/api/authors req.params.id", req.query)

    const id = (req.query.id);
    console.log(`id: ${id}`);

    //Get only one document
    if (req.method === 'GET') {
        const docs = await Author.find()
        const doc = docs.filter((doc) => doc.id == id);
        // const doc = await Author.findOne({ _id : id })
        console.log(`doc: ${JSON.stringify(doc)}`)
        res.status(200).json(doc)
    } 
    
    else if (req.method === 'DELETE') {
        const deletedDoc = await Author.deleteOne({ _id : id })
        console.log(`deletedDoc: ${JSON.stringify(deletedDoc)}`)
        res.status(200).json(deletedDoc);
    } 
    
    else if (req.method === 'POST') {        
        req.body._id = ((Math.random() * 100000000000000).toString().substring(0, 12));
        const doc = await Author.create(req.body)
        console.log(`new doc: ${JSON.stringify(doc)}`)
        res.status(201).json(doc)
    } 

    else if (req.method === 'PUT') {
        const updatedDoc = await Author.updateOne({ _id : id }, req.body);
        console.log(`updatedDoc: ${JSON.stringify(updatedDoc)}`);
        res.status(200).json(updatedDoc);
    }
    
    
    else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
    const authorSchema = new Schema({
        firstName: String,
        lastName: String,
        publisher: String,
        authorID: String
    })

    const Author = models?.author || model('author', authorSchema);