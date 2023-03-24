import * as React from 'react';
import Link from 'next/link'
import styles from '@/styles/Navbar.module.css';

const NavBar = () => (
  <>
    <div className = {styles.container}>
      <div className = {styles.linksContainer}>
        <div>
          <Link href="/" style = {{textDecoration: "none"}}>
            <p className = {styles.a}>Home</p>
          </Link>
        </div>

        <div>
          <Link href="/authors" style = {{textDecoration: "none"}}>
            <p className = {styles.a}>Authors</p>
          </Link>
        </div>

        <div>
          <Link href="/books" style = {{textDecoration: "none"}}>
            <p className = {styles.a}>Books</p>
          </Link>
        </div>

        <div>
          <Link href="/customers" style = {{textDecoration: "none"}}>
            <p className = {styles.a}>Customers</p>
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default NavBar;