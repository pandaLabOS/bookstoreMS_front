import { useState } from "react";
import { useForm } from "react-hook-form";
import Head from 'next/head'
import Link from 'next/link'

export default function AddBook() {
    const API_URL = "https://bookstore-ms-front.vercel.app/api";
    const {register, handleSubmit, watch, formState: { errors } } = useForm(); //handleSubmit is a tool provided by the react-hook-form hook
    const [data, setData] = useState("");

    const saveBook = async (data) => {
        const response = await fetch(`/api/authors`, {
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
                <title>Add New Author</title>
            </Head>
            <form onSubmit = {handleSubmit(saveBook)}>
                <h1>Add New Author</h1>
                <div style = {{ display: "flex", flexDirection: "row", gap: "3rem"}}>
                    <div>
                        <label htmlFor = "firstName">First Name</label><br/>
                        <input class = "form-control text-input" id = "firstName" name = "firstName" {...register('firstName', {required: 'This field is required'})} placeholder = "First Name" required/>

                        <label htmlFor = "lastName">Last Name</label><br/>
                        <input class = "form-control text-input" id = "lastName" name = "lastName" {...register('lastName', {required: 'This field is required'})} placeholder = "Last Name" required/>
                        
                        <label htmlFor="publisher">Publisher</label><br />
                        <input id="publisher" {...register("publisher")} placeholder="Name of Publisher" class="form-control"/>

                        {/* <label htmlFor="authorID">Author ID</label><br />
                        <input type = "text" id="authorID" {...register("authorID")} placeholder="Author ID" class="form-control"/> */}

                        <br/>
                        <div style = {{ display: "flex", flexDirection: "row", gap: "3rem", justifyItems: "stretch", alignItems: "center"}}>
                            <input type="submit" className = "submit" value = "Save"/>
                            <Link href = "/authors" style = {{textDecoration: "none", color: "var(--blue)"}}>
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