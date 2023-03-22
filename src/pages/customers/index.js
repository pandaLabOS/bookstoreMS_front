import * as React from 'react';
import Table from 'react-bootstrap/Table';
import '@/styles/Home.module.css';

export default function CustomerPage({ returnProps }) {
  const customers = returnProps[0]
  const API_URL = returnProps[1]
  console.log(`API_URL: ${API_URL}`)

    return (
      <div>
        <h1>Customers</h1>
        <Table striped bordered hover main>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.firstName} {customer.lastName}</td>
                <td>{customer.phoneNumber}</td>
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