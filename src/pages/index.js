import * as React from 'react';
import Link from 'next/Link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Image from 'next/Image';
import styles from '@/styles/style.module.css';

export default function Home({ returnProps }) {
    const authors = returnProps[0];
    const books = returnProps[1];
    const customers = returnProps[2];
    // console.log(`returnProps: ${JSON.stringify(returnProps)}`)
    return (
        <>
            <Container>
                <Row><h1>Bookstore Management</h1></Row>
                <br/>
                <Row><h2>Books</h2></Row>

                <Row>
                    <div className = "table-container">
                    <Table hover className = {styles.Table}>
                            <thead>
                                <tr key="head">
                                    <th style = {{width: "10px"}}>ISBN</th>
                                    <th style = {{width: "35px"}}>Book Title</th>
                                    <th style = {{width: "15px"}}>Author</th>
                                    <th style = {{width: "3px"}}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.isbn}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>
                                        <Link href = {`/books/update/${book.isbn}`}>
                                            <Image
                                                src = "/icons/edit.svg"
                                                alt = 'edit'
                                                width = {20}
                                                height = {20}
                                            />
                                        </Link>
                                    </td>
                                    
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Row>

                <br/>

                <Row><h1>Authors</h1></Row>
                <Row style = {{ display: "flex", flexDirection: "row" }}>
                    <div className = "table-container">
                        <Table hover className = {styles.Table}>
                            <thead>
                                <tr key="head">
                                <th>Author Name</th>
                                <th>Publisher</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {authors.map((author) => (
                                <tr key={author.authorID}>
                                    <td>{author.firstName} {author.lastName}</td>
                                    <td>{author.publisher}</td>
                                    <td>
                                    <Link href = {`/authors/update/${author.authorID}`}>
                                        <Image
                                            src = "/icons/edit.svg"
                                            alt = 'edit'
                                            width = {20}
                                            height = {20}
                                        />                                        </Link>
                                    </td>                                       
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Row>

                <br/>

                <Row><h2>Customers</h2></Row>
                <Row>
                    <div className = "table-container">
                        <Table hover className = {styles.Table}>
                            <thead>
                                <tr key="head">
                                <th>Customer Name</th>
                                <th>Phone Number</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer) => (
                                <tr key={customer.authorID}>
                                    <td>{customer.firstName} {customer.lastName}</td>
                                    <td>{customer.phoneNumber}</td>
                                    <td>
                                    <Link href = {`/customers/update/${customer.phoneNumber}`}>
                                        <Image
                                            src = "/icons/edit.svg"
                                            alt = 'edit'
                                            width = {20}
                                            height = {20}
                                        />
                                    </Link>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
               
                </Row>

                <br/>

                
            </Container>
        </>
    );
}

export async function getServerSideProps() {
    // console.log(`API_URL: ${process.env.API_URL}`)
    const authorRes = await fetch(`${process.env.API_URL}/authors`)
    const authors = await authorRes.json()

    const booksRes = await fetch(`${process.env.API_URL}/books`)
    const books = await booksRes.json()

    const customersRes = await fetch(`${process.env.API_URL}/customers`)
    const customers = await customersRes.json()

    const returnProps = [ authors, books, customers, process.env.API_URL ]

    return { props: { returnProps } }
}