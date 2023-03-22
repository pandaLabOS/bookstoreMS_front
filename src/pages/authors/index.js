import * as React from 'react';
import Table from 'react-bootstrap/Table';
import '@/styles/Home.module.css';

export default function AuthorPage({ returnProps }) {
  const authors = returnProps[0]
  const API_URL = returnProps[1]
  console.log(`API_URL: ${API_URL}`)

    return (
      <div>
        <h1>Authors</h1>
        <Table striped bordered hover main>
          <thead>
            <tr>
              <th>Author Name</th>
              <th>Publisher</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td>{author.firstName} {author.lastName}</td>
                <td>{author.publisher}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
}

export async function getServerSideProps() {
    console.log(`API_URL: ${process.env.API_URL}`)
    const res = await fetch(`${process.env.API_URL}/authors`)
    const authors = await res.json()
    const returnProps = [ authors, process.env.API_URL ]

    return { props: { returnProps } }
}