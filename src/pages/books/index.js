import * as React from 'react';
import Table from 'react-bootstrap/Table';
import '@/styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function BooksPage({ returnProps }) {
  const books = returnProps[0]
  const API_URL = returnProps[1]
  console.log(`API_URL: ${API_URL}`)

  function deleteBook(isbn) {
    console.log(`Deleting: ${isbn}`)
    fetch(`/api/books/${isbn}`, 
    { 
      method: 'DELETE', 
      headers: { 'Content-Type': 'application/json; charset=UTF-8'  }
    })
    .then(res => res.json())
    .then(data => {
        window.location.reload(false);
    })   
  }

    return (
      <div>
        <div style = {{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "1rem" }}>
          <h1>Books</h1>
          <Link href = "/books/add">
            <button type = "button" class = "btn btn-primary">Add new book</button>
          </Link>
        </div>
        
        <Table striped bordered hover>
          <thead>
            <tr key="head">
              <th>ISBN</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Price</th>
              {/* <th></th>
              <th></th> */}
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
                <td>
                  <Link href = {`/books/update/${book.isbn}`}>
                    <button type = "button" className = "btn btn-primary">Update</button>
                  </Link>
                </td>
                <td><button type = "button" className = "btn btn-danger" onClick = {() => deleteBook(book.isbn)}>Delete</button></td>
                {/* <td>
                  <Image
                    src = "/icons/delete.svg"
                    width = {20}
                    height = {20}
                    alt = "delete"
                    onClick = {() => deleteBook(book.isbn)}
                  />
                </td> */}
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