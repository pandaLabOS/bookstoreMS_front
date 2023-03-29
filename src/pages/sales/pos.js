import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import CoffeeCard from '../../components/CoffeeCard.js'
import { useLocalStorage } from 'react-use'

const dummyPrice = 65

export default function PosPage() {

    // window.localStorage['coffee'] = 'Latte'
    // ^^ The code above is an example of how to store data in the local storage but this is not the React style

    // vv Do this instead vv

    const [coffee, setCoffee] = useLocalStorage('coffee', 'Latte')

    /* 
    - The local storage is where we can store persistent data
    - The local storage is a key-value pair
    - Anything that begins with the word 'use' is a React Hook
    */

    let [coffeeTitles, setCoffeeTitles] = React.useState([])
    let [subMenu, setSubMenu] = React.useState('hot')
    let [cart, setCart] = useLocalStorage('cart', [])
    let [localData, setLocalData] = React.useState('XXX')
    let total = 0

    function addToCart(coffee) {
        console.debug(coffee)
        cart.push(coffee)
        console.log(cart)
        setCart([...cart])
    }

    React.useEffect(() => {
        let items = []
        fetch(`https://api.sampleapis.com/coffee/${subMenu}`) //await is easier to understand. The 'then' is not ideal
            .then(res => res.json()) //On a new line for readability | res is a complex object, but the app only needs the json data, so the first 'then' converts it to a json format
            .then((coffees) => { //coffees is the json data (assumed and recognized as the json data)
                for (let i = 0; i < coffees.length; i++) { //Prepare the CoffeeCards
                    coffees[i].price = 59
                    console.log(coffees[i])
                    items.push (
                        <CoffeeCard
                            key = {i}
                            image = {coffees[i].image}
                            title = {coffees[i].title }
                            // description = {coffees[i].description}
                            price = {dummyPrice}
                            handleClick = {() => {addToCart(coffees[i])}}
                        />
                    )
                }
                setCoffeeTitles(items)
            })
    }, [subMenu])

    return (
        <Container>
            <h1>Coffee</h1>
            <ButtonGroup>
                <Button variant="secondary" onClick={() => setSubMenu('hot')}>Hot</Button>
                <Button variant="secondary" onClick={() => setSubMenu('iced')}>Iced</Button>
            </ButtonGroup>
            <Row>
                <Col sm = {10}><Row>{coffeeTitles}</Row></Col>
                <Col sm = {2}>
                    <Row>
                        <h2>Cart</h2>
                    </Row>
                    {cart.map(item => {
                        return (
                            <Row>
                                <Col>{item.title} - 59 Baht</Col>
                            </Row>
                        )
                    })}
                    <Row>
                        <Col><b>Total: {cart.reduce(item => dummyPrice, 0)}</b></Col>
                    </Row>
                <Row>
 
                </Row>
                </Col>
            </Row>
        </Container>
    )
}