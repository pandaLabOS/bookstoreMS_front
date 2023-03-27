import { useState } from "react";
import { useForm } from "react-hook-form";
import Head from 'next/head'
import Link from 'next/link'

export default function AddCustomer() {
    const API_URL = "https://bookstore-ms-front.vercel.app/api";
    const {register, handleSubmit, watch, formState: { errors } } = useForm(); //handleSubmit is a tool provided by the react-hook-form hook
    const [data, setData] = useState("");
    console.log(`API_URL in ADD: ${API_URL}/customers`)

    const saveCustomer = async (data) => {
        const response = await fetch(`/api/customers`, {
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
                <title>Add New Customer</title>
            </Head>
            <form onSubmit = {handleSubmit(saveCustomer)}>
                <h1>Add New Customer</h1>
                <div style = {{ display: "flex", flexDirection: "row", gap: "3rem", width: "90vw" }}>
                    <div class="form-group">
                        <label htmlFor = "firstName">First Name</label><br/>
                        <input class = "form-control text-input" id = "firstName" name = "name" {...register('firstName', {required: 'This field is required'})} placeholder = "First Name" required/>

                        <label htmlFor = "lastName">Last Name</label><br/>
                        <input class = "form-control text-input" id = "lastName" name = "name" {...register('lastName', {required: 'This field is required'})} placeholder = "Last Name" required/>

                        <label htmlFor="phoneNumber">Phone Number</label><br />
                        <input id="phoneNumber" {...register("phoneNumber")} placeholder="Phone Number" class="form-control"/>
                        <div id="phoneHelp" class="form-text">0xx-xxx-xxxx</div>
                        
                        <br/>

                        <div>
                            <input type="submit" className = "submit" value = "Save"/>
                            <Link href = "/customers" style = {{textDecoration: "none", color: "var(--blue)"}}>
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