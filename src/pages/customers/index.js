import * as React from 'react';
import Table from 'react-bootstrap/Table';
import '@/styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function BooksPage({ returnProps }) {
  const customers = returnProps[0]
  const API_URL = returnProps[1]
  console.log(`API_URL: ${API_URL}`)

  function deleteCustomer(phoneNumber) {
    console.log(`Deleting: ${phoneNumber}`)
    fetch(`/api/customers/${phoneNumber}`, 
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

        {/* <p>{JSON.stringify(customers)}</p> */}
        
        <Table striped bordered hover>
          <thead>
            <tr key="head">
              <th>ID</th>
              <th>Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer._id}</td>
                <td>{customer.firstName} {customer.lastName}</td>
                <td>{customer.phoneNumber}</td>
                <td>
                  <Link href = {`/customers/update/${customer.id}`}>
                    <button type = "button" className = "btn btn-primary">Update</button>
                  </Link>
                </td>
                <td><button type = "button" className = "btn btn-danger" onClick = {() => deleteCustomer(customer.phoneNumber)}>Delete</button></td>
                {/* <td>
                  <Image
                    src = "/icons/delete.svg"
                    width = {20}
                    height = {20}
                    alt = "delete"
                    onClick = {() => deleteCustomer(book.isbn)}
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
    const res = await fetch(`${process.env.API_URL}/customers`)
    const customers = await res.json()
    const returnProps = [ customers, process.env.API_URL ]

    return { props: { returnProps } }
}