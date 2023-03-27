import * as React from 'react';
import Table from 'react-bootstrap/Table';
import '@/styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthorsPage({ returnProps }) {
  const authors = returnProps[0]
  const API_URL = returnProps[1]
  // console.log(`API_URL: ${API_URL}`)

  function deleteAuthor(id) {
    fetch(`/api/authors/${id}`, 
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
      <main>
        <div style = {{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "1rem" }}>
          <h1>Authors</h1>
          <Link href = "/authors/add">
            <button type = "button" className = "btn btn-primary">Add new author</button>
          </Link>
        </div>
        
        <Table striped bordered hover>
          <thead>
            <tr key="head">
              <th>ID</th>
              <th>Author Name</th>
              <th>Publisher</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.authorID}>
                <td>{author.authorID}</td>
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
      </main>
    );
}

export async function getServerSideProps() {
    console.log(`API_URL: ${process.env.API_URL}`)
    const res = await fetch(`${process.env.API_URL}/authors`)
    const authors = await res.json()
    const returnProps = [ authors, process.env.API_URL ]

    return { props: { returnProps } }
}