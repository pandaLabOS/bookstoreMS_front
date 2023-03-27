import * as React from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

export default function Home({ returnProps }) {
    console.log(`returnProps: ${returnProps}`)
    return (
        <>
            <h1>Home Page</h1>
            <div style = {{display: "flex", flexDirection: "row", gap: "1rem"}}>
                <Link href = "/authors">
                    <button type = "button" className = "btn btn-primary">Authors</button>
                </Link>
                <Link href = "/books">
                    <button type = "button" className = "btn btn-primary">Books</button>
                </Link>
                <Link href = "/customers">
                    <button type = "button" className = "btn btn-primary">Customers</button>
                </Link>
            </div>
            <Container>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
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
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export async function getServerSideProps() {
    console.log(`API_URL: ${process.env.API_URL}`)
    const res = await fetch(`${process.env.API_URL}/authors`)
    const authors = await res.json()
    const returnProps = [ authors, process.env.API_URL ]

    return { props: { returnProps } }
}