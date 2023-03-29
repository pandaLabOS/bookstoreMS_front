import {connect, model, models, Schema} from "mongoose"
const connectionString = "mongodb+srv://user1:bookstoreUser1@bookstorems.qgl1qca.mongodb.net/bookstore"

export default async function handler(req, res) {
    await connect(connectionString);

    if (req.method === 'GET') {
        const docs = await Sale.find().sort({ _id: 1 })
        res.status(200).json(docs)
    } 
    
    else if (req.method === 'POST') {
        req.body.date = req.body.date.split("T")[0]
        console.log(`req.body.date: ${req.body.date}`)
        req.body.totalSalesAmount = req.body.price * req.body.quantity
        const doc = await Sale.create(req.body)
        console.log(`doc: ${JSON.stringify(doc)}`)
        res.status(201).json(doc)
    } 
    
    else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

const saleSchema = new Schema({
    bookTitle: String,
    bookID: String,
    date: String,
    price: Number,
    quantity: Number,
    totalSalesAmount: Number
})

const Sale = models?.sale || model('sale', saleSchema);