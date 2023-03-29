import {connect, model, models, Schema} from "mongoose"
const connectionString = "mongodb+srv://user1:bookstoreUser1@bookstorems.qgl1qca.mongodb.net/bookstore"

export default async function handler(req, res) {
    await connect(connectionString);
    const id = req.query.id

    if (req.method === 'GET') {
        const doc = await Sale.findOne({ _id : id }).sort({ _id: 1 });
        console.log(`doc: ${doc}`);
        res.status(200).json(doc);
    } 
    
    else if (req.method === 'POST') {
        const newDoc = await Sale.create(req.body);
        console.log(`newDoc: ${JSON.stringify(newDoc)}`);
        res.status(201).json(newDoc);
    } 
    
    else if (req.method === 'PUT') {
        req.body.date = req.body.date.split("T")[0]
        // console.log(`req.body.date: ${req.body.date}`)
        req.body.totalSalesAmount = req.body.price * req.body.quantity
        const updatedDoc = await Sale.updateOne({ _id : id }, req.body );
        console.log(`updatedDoc: ${JSON.stringify(updatedDoc)}`);
        res.status(201).json(updatedDoc);
    } 
    
    else if (req.method === 'DELETE') {
        const deletedDoc = await Sale.deleteOne({ _id : id } );
        console.log(`deletedDoc: ${JSON.stringify(deletedDoc)}`);
        res.status(201).json(deletedDoc);
    } 

    else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

const saleSchema = new Schema({
    bookTitle: String,
    date: String,
    price: Number,
    quantity: Number,
    totalSalesAmount: Number
})

const Sale = models?.sale || model('sale', saleSchema);