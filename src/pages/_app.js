import '@/styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '/components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <header>
        <NavBar/>
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Chivo"/>
      </header>
      <Component {...pageProps} />
      
    </>
  )
}
