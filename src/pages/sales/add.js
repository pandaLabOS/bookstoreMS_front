import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from 'react-use';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Table from 'react-bootstrap/Table';

import styles from '@/styles/style.module.css';

export default function AddSale({ books }) {
    const API_URL = "https://bookstore-ms-front.vercel.app/api";
    const {register, handleSubmit, watch, formState: { errors } } = useForm();
    const [data, setData] = useState("");

    const saveSale = async (data) => {
        const response = await fetch(`/api/sales`, {
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
        setData(JSON.stringify(data));
    }

    return (
        <div>
            <Head>
                <title>Add New Sale</title>
            </Head>
            <div id = "po">
                <form onSubmit = {handleSubmit(saveSale)} style = {{ margin: "auto" }}>
                    <h1>Add New Sale</h1>
                    <div style = {{ display: "flex", flexDirection: "row", gap: "3rem"}}>
                        <div className = "form-group">
                            <label htmlFor = "bookTitle">Book Title</label><br/>
                            <select id = "selectBook" placeholder = "Book Title" className="form-select" aria-label="Default select example" {...register("bookTitle")}>
                                <option key = {books.length + 1} value = "" selected disabled>Select book title</option>
                                {books.map((book) => (
                                    <option key = {books.indexOf(book)} value={book.title}>{book.title}</option>
                                ))}
                            </select>

                            <label htmlFor = "date">Date</label><br/>
                            <input 
                                className = "form-control" 
                                id = "date" 
                                name = "date" {...register('date', {required: 'This field is required'})} 
                                placeholder = "Date" 
                                required
                            />

                            <label htmlFor="price">Price</label><br />
                            <input 
                                className = "form-control text-input"
                                id="price" {...register("price")} 
                                placeholder = "Price" 
                            />

                            <label htmlFor="quantity">Quantity</label><br />
                            <input 
                                className = "form-control"
                                id="quantity" {...register("quantity")} 
                                placeholder="Quantity" 
                            />

                            <br/>
                            
                            <div style = {{ display: "flex", flexDirection: "row", gap: "3rem", justifyItems: "stretch", alignItems: "center"}}>
                                <input type="submit" className = "submit" value = "Save"/>
                                <Link href = "/sales" style = {{textDecoration: "none", color: "var(--blue)"}}>
                                    <button className = "btn btn-form-back">Back</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <br/>
                </form>
            </div>
        </div>
    )
}

export async function getServerSideProps({params}) {
    console.log(`API_URL: ${process.env.API_URL}`)

    const booksRes = await fetch(`${process.env.API_URL}/books`)
    const books = await booksRes.json()

    return { props: { books } }
}