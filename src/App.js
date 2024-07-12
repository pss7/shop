import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
// import a from './data.js';
// import { a, b } from './data.js';
import data from './data.js';
import { useState } from 'react';

function App() {

  let [shoes] = useState(data);

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg" style={{ backgroundImage: 'url(' + bg + ')' }}></div>

      <div className="container">
        <div className="row">

          {/* 
          <Card shoes={shoes[0]} i={1} />
          <Card shoes={shoes[1]} i={2} />
          <Card shoes={shoes[2]} i={3} /> */}

          {
            shoes.map((a, i) => {
              return (
                <Card shoes={shoes[i]} i={i} />
              )
            })
          }

        </div>
      </div>

    </div>
  );
};

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
