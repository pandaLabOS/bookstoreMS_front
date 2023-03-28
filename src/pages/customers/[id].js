import * as React from 'react';

export default function Book( {customer} ) {
    return (
        <>
            <main>
                <h1>{customer.firstName} {customer.lastName}</h1>
                <price>{customer.phoneNumber} THB</price>
            </main>
        </>
    )
}

export async function getServerSideProps({ params }) {
    const res = await fetch(`${process.env.API_URL}customers/${params._id}`)
    const customer = await res.json()
    console.log(`GSS Customer: ${customer}`)
    return { props: { customer } }
}