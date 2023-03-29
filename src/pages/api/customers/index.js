import {connect, model, models, Schema} from "mongoose"
const connectionString = "mongodb+srv://user1:bookstoreUser1@bookstorems.qgl1qca.mongodb.net/bookstore"

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method", req.method)

    if (req.method === 'GET') {
        const docs = await Customer.find().sort({ firstName: 1, lastName : 1 })
        res.status(200).json(docs)
    } 
    
    else if (req.method === 'POST') {
        req.body._id = ((Math.random() * 1000000000000000000000000).toString().substring(0, 12));
        const doc = await Customer.create(req.body)
        res.status(201).json(doc)    
    } 
    
    else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

const customerSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String
})

const Customer = models?.customer || model('customer', customerSchema);