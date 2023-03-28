import { useState } from "react";
import { useForm } from "react-hook-form";
import Head from 'next/head'
import Link from 'next/link'

export default function UpdateBook({ returnProps }) {
    // console.log(`returnProps: ${returnProps}`)
    const book = returnProps[0]
    const API_URL = returnProps[1]
    const {register, handleSubmit, watch, formState: { errors } } = useForm(); //handleSubmit is a tool provided by the react-hook-form hook
    const [data, setData] = useState("");
    console.log(`API_URL: ${API_URL}`)

    const saveBook = async (data) => {
        console.log(`${API_URL}/books/${book.isbn}`);
        const response = await fetch(`/api/books/${book.isbn}`, {
            method: "PUT",
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
                <title>Update Book Details</title>
            </Head>
            <form onSubmit = {handleSubmit(saveBook)}>
                <h1>Update Book Details</h1>
                <div style = {{ display: "flex", flexDirection: "row", gap: "3rem", width: "90vw" }}>
                    <div class="form-group">
                        <label htmlFor = "title">Book Title</label><br/>
                        <input class = "form-control text-input" id = "title" name = "title" {...register('title', {required: 'This field is required'})} placeholder = "Book Title" required defaultValue = {book.title}/>

                        <label htmlFor = "isbn">ISBN</label><br/>
                        <input id = "isbn" {...register("isbn")} placeholder = "ISBN" class="form-control" required defaultValue = {book.isbn}/>
                    
                        <label htmlFor="year">Year of Publication</label><br />
                        <input id="year" {...register("year")} placeholder="Year of Publication" class="form-control" defaultValue = {book.year}/>
                        <div id="phoneHelp" class="form-text">e.g. 2015</div>
                    </div>

                    <div class = "form-group">
                        
                        <label htmlFor="author">Author</label><br />
                        <input id="author" {...register("author")} placeholder="Name of Author" class="form-control" defaultValue = {book.author}/>

                        <label htmlFor="price">Price</label><br />
                        <input type = "number" id="price" {...register("price")} placeholder="Price" class="form-control" min = "0" defaultValue = {book.price}/>
                        
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

export async function getServerSideProps({ params }) {
    const res = await fetch(`${process.env.API_URL}/books/${params.id}`)
    const book = await res.json()
    const returnProps = [book, process.env.API_URL]
    return { props: { returnProps } }
}