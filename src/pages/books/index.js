import * as React from 'react';
import Table from 'react-bootstrap/Table';
import '@/styles/Home.module.css';
import Image from 'next/image';

export default function BooksPage({ returnProps }) {
  const books = returnProps[0]
  const API_URL = returnProps[1]
  console.log(`API_URL: ${API_URL}`)

    return (
      <div>
        <h1>Books</h1>
        <Table striped bordered hover className = "main">
          <thead>
            <tr key="head">
              <th>ISBN</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
}

export async function getServerSideProps() {
    console.log(`API_URL: ${process.env.API_URL}`)
    const res = await fetch(`${process.env.API_URL}/books`)
    const books = await res.json()
    const returnProps = [ books, process.env.API_URL ]

    return { props: { returnProps } }
}