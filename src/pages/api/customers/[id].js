import {connect, model, models, Schema} from "mongoose"
const connectionString = "mongodb+srv://user1:bookstoreUser1@bookstorems.qgl1qca.mongodb.net/bookstore"

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method", req.method)
    console.log("req.params.id", req.query) //Because this is being run server-side, the console.log results in an output in the terminal (which is on the server) rather than the Dev Console on browsers (because those are client-side)

    const phoneNumber = req.query.id

    //Get only one document
    if (req.method === 'GET') {
        try{
            const doc = await Customer.findOne({ id : phoneNumber})
            res.status(200).json(doc)
        } catch (err) {
            console.log(`err: ${err}`);
        }
    } 
    
    else if (req.method === 'PUT') {
        try{
            const updatedDoc = await Customer.updateOne({ id: phoneNumber }, req.body)
            console.log(`updatedDoc: ${JSON.stringify(updatedDoc)}`)
            res.status(200).json(updatedDoc)
        } catch (err) {
            console.log(`err: ${err}`);
        }
    }

    else if (req.method === 'POST') {
        try{
            req.body.id = phoneNumber;
            const newDoc = await Customer.create(req.body)
            console.log(`newDoc: ${newDoc}`)
            res.status(200).json(newDoc)
        } catch (err) {
            console.log(`err: ${err}`);
        }
    }

    else if (req.method === 'DELETE') {
        try{
            const deletedDoc = await Customer.deleteOne({ id: phoneNumber})
            console.log(`deletedDoc: ${JSON.stringify(deletedDoc)}`)
            res.status(200).json(deletedDoc)
        } catch (err) {
            console.log(`err: ${err}`);
        }
    } 
   
    else {
        res.setHeader('Allow', ['GET', 'DELETE','PUT','POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
    const customerSchema = new Schema({
        _id: String,
        firstName: String,
        lastName: String,
        phoneNumber: String
    })

    const Customer = models?.customer || model('customer', customerSchema);