import * as React from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

export default function Home({ returnProps }) {
    const authors = returnProps[0];
    const books = returnProps[1];
    const customers = returnProps[2];
    console.log(`returnProps: ${JSON.stringify(returnProps)}`)
    return (
        <>
            <Container>
                <Row><h1>Bookstore Management</h1></Row>
                <Row><h2>Books</h2></Row>

                <Row>
                    <div className = "table-container">
                        <Table striped bordered hover className = "one-third-width">
                            <thead>
                                <tr key="head">
                                    <th>ISBN</th>
                                    <th>Book Title</th>
                                    <th>Author</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.isbn}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Row>
                <br/>
                <Row><h2>Authors</h2></Row>
                <Row>
                <div className = "table-container">
                    <Table striped bordered hover>
                        <thead>
                            <tr key="head">
                            <th>Author Name</th>
                            <th>Publisher</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors.map((author) => (
                            <tr key={author.authorID}>
                                <td>{author.firstName} {author.lastName}</td>
                                <td>{author.publisher}</td>
                                <td>
                                <Link href = {`/authors/update/${author.authorID}`}>
                                    <button type = "button" className = "btn btn-primary">Update</button>
                                </Link>
                                </td>
                                <td><button type = "button" className = "btn btn-danger" onClick = {() => deleteAuthor(author.authorID)}>Delete</button></td>
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
                    <Table striped bordered hover>
                        <thead>
                            <tr key="head">
                            <th>Customer Name</th>
                            <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                            <tr key={customer.authorID}>
                                <td>{customer.firstName} {customer.lastName}</td>
                                <td>{customer.phoneNumber}</td>
                                <td>
                                <Link href = {`/customers/update/${customer.phoneNumber}`}>
                                    <button type = "button" className = "btn btn-primary">Update</button>
                                </Link>
                                </td>
                                <td><button type = "button" className = "btn btn-danger" onClick = {() => deleteAuthor(author.authorID)}>Delete</button></td>
                            </tr>
                            ))}
                        </tbody>
                        </Table>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export async function getServerSideProps() {
    console.log(`API_URL: ${process.env.API_URL}`)
    const authorRes = await fetch(`${process.env.API_URL}/authors`)
    const authors = await authorRes.json()

    const booksRes = await fetch(`${process.env.API_URL}/books`)
    const books = await booksRes.json()

    const customersRes = await fetch(`${process.env.API_URL}/customers`)
    const customers = await customersRes.json()

    const returnProps = [ authors, books, customers, process.env.API_URL ]

    return { props: { returnProps } }
}