import * as React from 'react';
import Table from 'react-bootstrap/Table';
import '@/styles/Home.module.css';
import styles from '@/styles/style.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

export default function SalesPage({ returnProps }) {
  const sales = returnProps[0]
  const API_URL = returnProps[1]
  console.log(`API_URL: ${API_URL}`)

  function deleteSale(id) {
    console.log(`Deleting: ${id}`)
    fetch(`/api/sales/${id}`, 
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
          <title>Sales</title>
        </Head>
        <div style = {{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "1rem" }}>
          <h1>Sales</h1>
          <Link href = "/sales/add">
            <button type = "button" className = "btn btn-primary">Add new sale</button>
          </Link>
        </div>
        
        <Table hover className = {styles.Table}>
          <thead>
            <tr key="head">
              <th style = {{ width: "1rem" }}>ID</th>
              <th style = {{ width: "3rem" }}>Book Title</th>
              <th style = {{ width: "8rem" }}>Date</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Sales Amount</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>{(sale._id).toString().substring(0,2)}{sales.indexOf(sale)+1}</td>
                <td width = "35%">{sale.bookTitle}</td>
                <td>{(sale.date).toString().substring(0, 10)}</td>
                <td>{sale.price}</td>
                <td>{sale.quantity}</td>
                <td>{sale.totalSalesAmount}</td>
                <td>
                  <Link href = {`/sales/update/${sale._id}`}>
                    <Image
                      src = "/icons/edit.svg"
                      alt = 'edit'
                      width = {20}
                      height = {20}
                    />
                  </Link>
                </td>
                <td onClick = {() => deleteSale(sale._id)}>
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
    const res = await fetch(`${process.env.API_URL}/sales`)
    const sales = await res.json()
    const returnProps = [ sales, process.env.API_URL ]

    return { props: { returnProps } }
}