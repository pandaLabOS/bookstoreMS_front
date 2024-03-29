import { useState } from "react";
import { useForm } from "react-hook-form";
import Head from 'next/head'
import Link from 'next/link'

export default function UpdateBook({ returnProps }) {
    console.log(`returnProps: ${JSON.stringify(returnProps)}`)
    let author = returnProps[0]
    author = author[0]
    console.log(`author: ${JSON.stringify(author)}`)
    const API_URL = returnProps[1]
    const {register, handleSubmit, watch, formState: { errors } } = useForm(); //handleSubmit is a tool provided by the react-hook-form hook
    const [data, setData] = useState("");
    console.log(`API_URL: ${API_URL}`)

    const saveAuthor = async (data) => {
        const response = await fetch(`/api/authors/${author._id}`, {
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
        console.log(`Update results: ${result}`);
        setData(JSON.stringify(data)) // an arrow function that receives a single parameter, data, and sets the state of data to the stringified version of the data parameter
        
    }

    return (
        <main style = {{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "auto" }}>
            <Head>
                <title>Update Author Details</title>
            </Head>

            <h1 style = {{ margin: "auto" }}>Update Author</h1>
            <form onSubmit = {handleSubmit(saveAuthor)} style = {{ margin: "auto" }}>
                <div style = {{ display: "flex", flexDirection: "row", gap: "3rem"}}>
                    <div class = "form-group">
                        <label htmlFor = "firstName">First Name</label><br/>
                        <input class = "form-control text-input" id = "firstName" name = "firstName" {...register('firstName', {required: 'This field is required'})} placeholder = "First Name" defaultValue = {author.firstName} required/>
                        
                        <label htmlFor = "lastName">Last Name</label><br/>
                        <input class = "form-control text-input" id = "lastName" name = "lastName" {...register('lastName', {required: 'This field is required'})} placeholder = "Last Name" defaultValue = {author.lastName} required/>
                    
                        <label htmlFor="publisher">Publisher</label><br />
                        <input id="publisher" {...register("publisher")} placeholder="Name of Publisher" class="form-control" defaultValue = {author.publisher}/>
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
            
        </main>
    )
}

export async function getServerSideProps({ params }) {
    console.log(`params: ${JSON.stringify(params.id)}`)
    const res = await fetch(`${process.env.API_URL}/authors/${params.id}`)
    const author = await res.json()
    const returnProps = [author, process.env.API_URL]
    return { props: { returnProps } }
}