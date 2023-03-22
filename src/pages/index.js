import * as React from 'react';
import Link from 'next/Link';

export default function Home() {
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
        </>
    );
}