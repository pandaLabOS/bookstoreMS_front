import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from 'react-use';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Table from 'react-bootstrap/Table';

import styles from '@/styles/style.module.css';

export default function AddSale({ books, sale }) {
    const API_URL = "https://bookstore-ms-front.vercel.app/api";
    const {register, handleSubmit, watch, formState: { errors } } = useForm();
    const [data, setData] = useState("");

    const saveSale = async (data) => {
        console.log(`data: ${JSON.stringify(sale._id)}`)
        const response = await fetch(`/api/sales/${sale._id}`, {
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
        setData(JSON.stringify(data));
    }

    return (
        <div>
            <Head>
                <title>Sales</title>
            </Head>
            <div id = "po">
                <p style = {{ color: "white" }}>{JSON.stringify(sale)}</p>
                <form onSubmit = {handleSubmit(saveSale)} style = {{ margin: "auto" }}>
                    <h1>Update Sale</h1>
                    <div style = {{ display: "flex", flexDirection: "row", gap: "3rem"}}>
                        <div className = "form-group">
                            <label htmlFor = "bookTitle">Book Title</label><br/>
                            {/* <input 
                                className = "form-control text-input" 
                                id = "bookTitle" 
                                name = "title" {...register('bookTitle', {required: 'This field is required'})} 
                                placeholder = "Book Title" 
                                defaultValue = {sale.bookTitle} 
                                required
                            /> */}
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
                                defaultValue = {sale.date.toString().substring(0,15)} 
                                required
                            />

                            <label htmlFor="price">Price</label><br />
                            <input 
                                className = "form-control text-input"
                                id="price" {...register("price")} 
                                placeholder = "Price" 
                                defaultValue = {sale.price} 
                            />

                            <label htmlFor="quantity">Quantity</label><br />
                            <input 
                                className = "form-control"
                                id="quantity" {...register("quantity")} 
                                placeholder="Quantity" 
                                defaultValue = {sale.quantity} 
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

    const saleRes = await fetch(`${process.env.API_URL}/sales/${params.id}`)
    const sale = await saleRes.json()

    console.log(`sale: ${sale}`);

    const returnProps = [ sale, process.env.API_URL ]

    return { props: { books, sale } }
}