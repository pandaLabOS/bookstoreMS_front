import {connect, model, models, Schema} from "mongoose"
const connectionString = "mongodb+srv://user1:bookstoreUser1@bookstorems.qgl1qca.mongodb.net/bookstore"

export default async function handler(req, res) {
    await connect(connectionString);

    if (req.method === 'GET') {
        const docs = await Author.find().sort({ firstName: 1, lastName : 1 })
        res.status(200).json(docs)
    } 
    
    else if (req.method === 'POST') {
        // console.log(`req.body: ${JSON.stringify(req.body._id)}`)
        const doc = await Author.create({
            _id: ((Math.random() * 100000000000000).toString().substring(0, 12)),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            publisher: req.body.publisher,
            authorID: String(req.body.authorID)
        })
        console.log(`doc: ${JSON.stringify(doc)}`)
        res.status(201).json(doc)
    } 
    
    else {
        res.setHeader('Allow', ['GET', 'POST'])
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