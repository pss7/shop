import { lazy, Suspense, useEffect, useState} from 'react';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

const Detail = lazy(() => import('./routes/Detail.js'))
const Cart = lazy(() => import('./routes/Cart.js'))

function App() {

  useEffect(() => {

    localStorage.setItem('watched', JSON.stringify([]));

  })

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  let result = useQuery('작명', () => {
    axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      console.log('요청됨');
      return a.data
    })
  })

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('./cart')}}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
          <Route path="/" element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">

                  {
                    shoes.map((a, i) => {
                      return (
                        <Card shoes={shoes[i]} i={i} key={i}></Card>
                      )
                    })
                  }

                </div>
              </div>
              <button onClick={() => {

                axios.get('https://codingapple1.github.io/shop/data2.json').then((result) => {
                  console.log(result.data)
                  let copy = [...shoes, ...result.data]
                  setShoes(copy);
                })

              }}>더보기</button>
            </>
          } />

          <Route path="/detail/:id" element={

            <Detail shoes={shoes} />
          } />
          <Route path="/cart" element={<Cart />} />

        </Routes>
      </Suspense>

    </div>
  )
}

function Card(props) {

  return (

    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="80%" />
      <h1>
        {props.shoes.title}
      </h1>
      <p>
        {props.shoes.content}
      </p>
      <p>
        {props.shoes.price}
      </p>
    </div>

  )

}

export default App;
