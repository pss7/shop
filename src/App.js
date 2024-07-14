import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
import data from './data.js';
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail.js';

function App() {

  let [shoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate("/") }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate("/detail") }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg" style={{ backgroundImage: 'url(' + bg + ')' }}></div>
            <div className="container">
              <div className="row">

                {
                  shoes.map((a, i) => {
                    return (
                      <Card shoes={shoes[i]} i={i} />
                    )
                  })
                }

              </div>
            </div>
          </>
        }

        ></Route>
        <Route path="/detail" element={<Detail />} />
        
        <Route path="/about" element={<About />} >
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>

        <Route path='*' element={<div>404</div>} />
      </Routes>

    </div>
  );
};

function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet />
    </div>
  )
}

function Card(props) {

  return (

    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>

  );

};


export default App;
