import * as React from 'react';

export default function Book( {book} ) {
    return (
        <>
            <main>
                <h1>{book.title}</h1>
                <subtitle>{book.author} ({book.year})</subtitle><br/>
                <price>{book.price} THB</price>
            </main>
        </>
    )
}

export async function getServerSideProps({ params }) {
    const res = await fetch(`${process.env.API_URL}books/${params.id}`)
    const book = await res.json()
    return { props: { book } }
}