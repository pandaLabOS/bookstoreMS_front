import { useState } from "react";
import { useForm } from "react-hook-form";
import Head from 'next/head'
import Link from 'next/link'

export default function UpdateCustomer({ returnProps }) {
    const customer = returnProps[0]
    const API_URL = returnProps[1]
    const {register, handleSubmit, watch, formState: { errors } } = useForm(); //handleSubmit is a tool provided by the react-hook-form hook
    const [data, setData] = useState("");
    console.log(`API_URL: ${API_URL}`)
    console.log(`customer: ${customer}`)

    const saveCustomer = async (data) => {
        console.log(`${API_URL}/books/${customer.isbn}`);
        const response = await fetch(`/api/customers/${customer.phoneNumber}`, {
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
                <title>Update Customer Details</title>
            </Head>
            {/* {JSON.stringify(customer)} */}
            <form onSubmit = {handleSubmit(saveCustomer)}>
                <h1>Update Customer Details</h1>
                <div style = {{ display: "flex", flexDirection: "row", gap: "3rem", width: "90vw" }}>
                    <div class="form-group">
                        <label htmlFor = "firstName">First Name</label><br/>
                        <input 
                            class = "form-control text-input" 
                            id = "firstName" 
                            name = "name" {...register('firstName', {required: 'This field is required'})} 
                            placeholder = "First Name" 
                            defaultValue = {customer.firstName} 
                            required
                        />

                        <label htmlFor = "lastName">Last Name</label><br/>
                        <input 
                            class = "form-control text-input" 
                            id = "lastName" 
                            name = "name" {...register('lastName', {required: 'This field is required'})} 
                            placeholder = "Last Name" 
                            defaultValue = {customer.lastName} 
                            required
                        />

                        <label htmlFor="phoneNumber">Phone Number</label><br />
                        <input 
                            id="phoneNumber" {...register("phoneNumber")} 
                            placeholder="Phone Number" 
                            class="form-control"
                            defaultValue = {customer.phoneNumber} 
                            />
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

export async function getServerSideProps({ params }) {
    console.log(`${process.env.API_URL}/customers/${params.phoneNumber}`)
    const res = await fetch(`${process.env.API_URL}/customers/${params.phoneNumber}`)
    const customer = await res.json()
    const returnProps = [customer, process.env.API_URL]
    return { props: { returnProps } }
}