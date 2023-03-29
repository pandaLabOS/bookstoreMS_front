import * as React from 'react';
import Table from 'react-bootstrap/Table';
import '@/styles/Home.module.css';
import styles from '@/styles/style.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

export default function CustomersPage({ returnProps }) {
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
        <Head>
          <title>Customers</title>
        </Head>
        <div style = {{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "1rem" }}>
          <h1>Customers</h1>
          <Link href = "/customers/add">
            <button type = "button" class = "btn btn-primary">Add new customer</button>
          </Link>
        </div>
        
        <Table hover className = {styles.Table}>
          <thead>
            <tr key="head">
              <th>Name</th>
              <th>Phone Number</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
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
                {/* <td><button type = "button" className = "btn btn-danger" onClick = {() => deleteCustomer(customer.phoneNumber)}>Delete</button></td> */}
                <td onClick = {() => deleteCustomer(customer.phoneNumber)}>
                  <Image
                      src = "/icons/delete.svg"
                      alt = 'edit'
                      width = {20}
                      height = {20}
                    />               
                </td>
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