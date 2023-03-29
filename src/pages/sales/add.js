import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from 'react-use';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Table from 'react-bootstrap/Table';

import styles from '@/styles/style.module.css';

export default function AddSale({ books, sales }) {
    const API_URL = "https://bookstore-ms-front.vercel.app/api";
    const {register, handleSubmit, watch, formState: { errors } } = useForm();
    const [data, setData] = useState("");

    let [cart, setCart] = useLocalStorage('cart', []);
    let [date, setDate] = useLocalStorage('date', "");

    const [booksInCart, setBooksInCart] = useLocalStorage("booksInCart", []);

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
        setCart([]);
    }

    const addToCart = async (data) => {
        cart.push(data)
        setCart([...cart])

        setDate(data.date);

        booksInCart.push(data.bookTitle);
        setBooksInCart([...booksInCart]);
    }

    function removeFromCart(id) {
        for (let i = 0; i < cart.length; i++) {
            if (i === id) {
                cart.splice(i, 1);
                setCart([...cart])
            }
        }
    }

    return (
        <div>
            <Head>
                <title>Sales</title>
            </Head>
            <div id = "po">
                <form onSubmit = {handleSubmit(addToCart)}>
                    <h1>Sales</h1>
                    <div style = {{ display: "flex", flexDirection: "row", gap: "0.5rem", width: "90vw"}}>
                        <div style = {{ width: "20rem"}}>
                            <label>Title</label>
                            <select id = "selectBook" placeholder = "Book Title" class="form-select" aria-label="Default select example" {...register("bookTitle")}>
                                {books.map((book) => (
                                    <option value={book.title}>{book.title}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Date</label>
                            <input type = "date" class = "form-control text-input" id = "date" name = "date" {...register('date', {required: 'This field is required'})} placeholder = "Sales date" required/>
                        </div>
                        <div>
                            <label>Price</label>
                            <input type = "number" id="price" {...register("price")} placeholder="Price per unit" class="form-control"/>
                        </div>

                        <div>
                            <label>Quantity</label>
                            <input type = "number" id="quantity" {...register("quantity")} placeholder="Quantity" class="form-control"/>
                        </div>

                        <div>
                            <label style = {{color: "var(--dark-grey)"}}>Add to Cart</label>
                            <input type = "submit" class = "btn btn-primary" value = "Add to cart"/>
                        </div>
                    </div>
                    <br/>
                    <div style = {{ display: "flex", flexDirection: "row", gap: "0.5rem", width: "80vw", placeItems: "center", justifyContent: "center"}}>
                        {/* <input type="submit" className = "submit" value = "Save"/>
                        <Link href = "/customers" style = {{textDecoration: "none", color: "var(--blue)"}}>
                            <button className = "btn btn-form-back">Back</button>
                        </Link> */}
                    </div>
                </form>
            </div>
            <form onSubmit = {handleSubmit(saveSale)}>
                <Table hover className = {styles.Table}>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Unit Price</td>
                            <td>Quantity</td>
                            <td>Total</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody id = "tableBody">
                        {
                            cart.map((book) => {
                                return (
                                    <tr>
                                        <td>{book.bookTitle}</td>
                                        <td>{book.price}</td>
                                        <td>{book.quantity}</td>
                                        <td>{book.price * book.quantity}</td>
                                        <td onClick = {() => removeFromCart(cart.indexOf(book))}>
                                            <Image
                                                src = "/icons/delete.svg"
                                                alt = "Delete"
                                                width = {20}
                                                height = {20}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot style = {{ display: "flex", flexDirection: "row", gap: "3rem", justifyItems: "stretch", alignItems: "center"}}>
                        <tr>
                            <td colSpan = "4"></td>
                            <td colSpan = "1">Total: {(cart.reduce((a,c) => Number(a) + Number(c.price * c.quantity), 0))}</td>
                        </tr>
                    </tfoot>
                </Table>
                <br/>
                <div style = {{ display: "flex", flexDirection: "row", gap: "3rem", justifyContent: "flex-start"}}>
                    <input type="submit" className = "submit" value = "Save"/>
                    <Link href = "/sales" style = {{textDecoration: "none", color: "var(--blue)"}}>
                        <button className = "btn btn-form-back">Back</button>
                    </Link>
                </div>
            </form>
            
        </div>
    )
}

export async function getServerSideProps() {
    console.log(`API_URL: ${process.env.API_URL}`)

    const booksRes = await fetch(`${process.env.API_URL}/books`)
    const books = await booksRes.json()

    const salesRes = await fetch(`${process.env.API_URL}/sales`)
    const sales = await salesRes.json()

    const returnProps = [ books, sales, process.env.API_URL ]

    return { props: { books, sales } }
}