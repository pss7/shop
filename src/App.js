import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
// import a from './data.js';
// import { a, b } from './data.js';
import data from './data.js';
import { useState } from 'react';

function App() {

  let [ shoes ] = useState(data);

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
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="80%" />
            <h4>{shoes[0].title}</h4>
            <p>{shoes[0].price}</p>
          </div>
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="80%" />
            <h4>{shoes[1].title}</h4>
            <p>{shoes[1].price}</p>
          </div>
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="80%" />
            <h4>{shoes[2].price}</h4>
            <p>{shoes[2].price}</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
