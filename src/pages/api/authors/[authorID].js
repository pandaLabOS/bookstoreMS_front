import {connect, model, models, Schema} from "mongoose"
const connectionString = "mongodb+srv://user1:bookstoreUser1@bookstorems.qgl1qca.mongodb.net/bookstore"

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("/api/authors req.method", req.method)
    console.log("/api/authors req.params.id", req.query)

    const id = (req.query.authorID);

    //Get only one document
    if (req.method === 'GET') {
        const docs = await Author.find()
        console.log(`id: ${id}`)
        console.log(`Author object: ${docs[0]}`)
        const doc = docs.filter((doc) => doc.id == id);
        res.status(200).json(doc)
    } 
    
    else if (req.method === 'DELETE') {
        const deletedDoc = await Author.deleteOne({ authorID : id })
        console.log(`deletedDoc: ${JSON.stringify(deletedDoc)}`)
        res.status(200).json(deletedDoc);
    } 
    
    else if (req.method === 'POST') {
        console.log(`req.body.authorID: ${typeof req.body.authorID}`)
        
        req.body._id = req.body.authorID;
        console.log(`req.body: ${JSON.stringify(req.body)}`)

        const doc = await Author.create(req.body)
        console.log(`req.body: ${JSON.stringify(doc)}`)

        res.status(201).json(doc)
    } 

    else if (req.method === 'PUT') {
        // req.body._id = req.body.authorID;
        const updatedDoc = await Author.updateOne({ authorID : id }, req.body)
        res.status(200).json(updatedDoc)
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