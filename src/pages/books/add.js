import { useState } from "react";
import { useForm } from "react-hook-form";
import Head from 'next/head'
import Link from 'next/link'

export default function AddBook() {
    const API_URL = process.env.API_URL;
    const {register, handleSubmit, watch, formState: { errors } } = useForm(); //handleSubmit is a tool provided by the react-hook-form hook
    const [data, setData] = useState("");
    console.log(`API_URL: ${API_URL}`)

    const saveBook = async (data) => {
        const response = await fetch(`${API_URL}/books`, {
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
        <div>
            <Head>
                <title>Add New Book</title>
            </Head>
            <form onSubmit = {handleSubmit(saveBook)}>
                <h1>Add New Book</h1>
                <div style = {{ display: "flex", flexDirection: "row", gap: "3rem", width: "90vw" }}>
                    <div class="form-group">
                        <label htmlFor = "title">Book Title</label><br/>
                        <input class = "form-control text-input" id = "title" name = "title" {...register('title', {required: 'This field is required'})} placeholder = "Book Title" required/>

                        <label htmlFor = "isbn">ISBN</label><br/>
                        <input id = "isbn" {...register("isbn")} placeholder = "ISBN" class="form-control" required/>
                    
                        <label htmlFor="year">Year of Publication</label><br />
                        <input id="year" {...register("year")} placeholder="Year of Publication" class="form-control"/>
                        <div id="phoneHelp" class="form-text">e.g. 2015</div>
                    </div>

                    <div class = "form-group">
                        
                        <label htmlFor="author">Author</label><br />
                        <input id="author" {...register("author")} placeholder="Name of Author" class="form-control"/>

                        <label htmlFor="price">Price</label><br />
                        <input type = "number" id="price" {...register("price")} placeholder="Price" class="form-control" min = "0"/>
                        
                        <br/>
                        <div style = {{ display: "flex", flexDirection: "row", gap: "3rem", justifyItems: "stretch", alignItems: "center"}}>
                            <input type="submit" className = "submit" value = "Save"/>
                            <Link href = "/books" style = {{textDecoration: "none", color: "var(--blue)"}}>
                                <button className = "btn btn-form-back">Back</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <br/>
                
            </form>
            
            
        </div>
    )
}