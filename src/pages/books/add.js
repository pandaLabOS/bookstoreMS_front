import { useState } from "react";
import { useForm } from "react-hook-form";
import Head from 'next/head'
import Link from 'next/link'

export default function AddSupplier() {
    const {register, handleSubmit, watch, formState: { errors } } = useForm(); //handleSubmit is a tool provided by the react-hook-form hook
    const [data, setData] = useState("");
    console.log(`API_URL: ${process.env.API_URL}`)

    const saveBook = async (data) => {
        const response = await fetch(`${process.env.API_URL}books`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
          });
        const result = await response.json();
        setData(JSON.stringify(data)) // an arrow function that receives a single parameter, data, and sets the state of data to the stringified version of the data parameter
        
    }

    return (
        <div style = {{backgroundColor: "var(--light-grey)", display: "flex", justifyContent: "center", alignContent: "center", padding: "3rem", width: "100vw"}}>
            <Head>
                <title>Add New Supplier</title>
            </Head>
            <form onSubmit = {handleSubmit(saveBook)} style = {{padding: "1rem", width: "30rem"}}>
                <h3>Add New Supplier</h3>
                <hr className="solid"/><br/>
                <div class="form-group">
                    <h3>Book Information</h3>
                    <label htmlFor = "bookTitle">Book Title</label><br/>
                    <input class = "form-control text-input" id = "bookTitle" name = "bookTitle" {...register('bookTitle', {required: 'This field is required'})} placeholder = "Book Title" required/><br/>

                    <label htmlFor = "isbn">ISBN</label><br/>
                    <input id = "isbn" {...register("isbn")} placeholder = "ISBN" class="form-control" required/><br/>
                </div>

                <br/>

                <div class = "form-group">
                    <label htmlFor="year">Year of Publication</label><br />
                    <input id="year" {...register("year")} placeholder="Year of Publication" class="form-control"/>
                    <div id="phoneHelp" class="form-text">e.g. 2015</div><br/>

                    <label htmlFor="author">Author</label><br />
                    <input id="author" {...register("author")} placeholder="Name of Author" class="form-control"/>

                    <label htmlFor="price">Price</label><br />
                    <input id="price" {...register("price")} placeholder="Price" class="form-control"/>
                </div>

                <div class = "form-group hGroup">
                    <Link href = "/supplier" style = {{textDecoration: "none", color: "var(--blue)"}}>
                        <p>Back</p>
                    </Link>
                    <br/><br/>
                    <input type="submit" class = "submit" value = "Save"/>
                </div>
                
            </form>
            
        </div>
    )
}