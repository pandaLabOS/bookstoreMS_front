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
    const res = await fetch(`https://bookstore-ms-back.vercel.app/api/books/${params.id}`)
    const book = await res.json()
    console.log(`FETCH URL: https://bookstore-ms-back.vercel.app/api/books/${params.id}`)
    return { props: { book } }
}