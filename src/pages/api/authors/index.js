import {connect, model, models, Schema} from "mongoose"
const connectionString = "mongodb+srv://user1:bookstoreUser1@bookstorems.qgl1qca.mongodb.net/bookstore"

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method", req.method)

    if (req.method === 'GET') {
        const docs = await Author.find()
        res.status(200).json(docs)
    } 
    
    else if (req.method === 'POST') {
        const doc = await Author.create(req.body)
        res.status(201).json(doc)
    } 
    
    else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
const authorSchema = new Schema({
    _id: String,
    firstName: String,
    lastName: String,
    publisher: String
})

const Author = models?.author || model('author', authorSchema);