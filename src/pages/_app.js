import '@/styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '/components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <header>
        <NavBar/>
      </header>
      <Component {...pageProps} />
      
    </>
  )
}
