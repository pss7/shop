import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
import data from './data.js';
import { createContext, lazy, useEffect, useState, Suspense } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { BarLoader } from 'react-spinners';
import { useQuery } from 'react-query';
import Test from './Test.js';

// import Detail from './routes/Detail.js';
// import Cart from './routes/Cart.js';

const Detail = lazy(() => import('./routes/Detail.js'))
const Cart = lazy(() => import('./routes/Cart.js'))

export let Context1 = createContext();

function App() {

  let [loading, setLoading] = useState(false);
  let [btnNum, setBtnNum] = useState(0);
  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10, 11, 12]);
  let navigate = useNavigate();

  let result = useQuery('작명', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      console.log('요청됨')
      return a.data
    }),
    {
      staleTime: 2000
    }
  })

  console.log(result.data);
  console.log(result.isLoading);
  console.log(result.error);

  useEffect(() => {

    let watched = localStorage.getItem('watched');

    if (!watched) {
      localStorage.setItem('watched', JSON.stringify([]));
    }

  }, []);

  /*
  let obj = { name: 'park' };
  localStorage.setItem('data', JSON.stringify(obj));
  let 꺼낸거 = localStorage.getItem('data');
  console.log(JSON.parse(꺼낸거));
  */

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate("/") }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate("/cart") }}>Cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
          <Route path="/" element={
            <>
              <div className="main-bg" style={{ backgroundImage: 'url(' + bg + ')' }}></div>
              <div className="container">
                <div className="row">

                  {
                    shoes.map((a, i) => {
                      return (
                        <Card key={i} shoes={shoes[i]} i={i} />
                      )
                    })
                  }

                </div>
              </div>
              <button onClick={() => {

                setLoading(true);
                setBtnNum(btnNum + 1);

                /*
  if (btnNum == 1) {
    axios.get('https://codingapple1.github.io/shop/data2.json')
      .then((결과) => {
        let copy = [...shoes, ...결과.data];
        setShoes(copy);
        setLoading(false);
      })
      .catch(() => {
        console.log('실패함');
        setLoading(false);
      })
  } else if (btnNum == 2) {
    axios.get('https://codingapple1.github.io/shop/data3.json')
      .then((결과) => {
        let copy = [...shoes, ...결과.data];
        setShoes(copy);
        setLoading(false);
      })
      .catch(() => {
        console.log('실패함');
        setLoading(false);
      })
  } else {
    alert('상품이 없습니다.');
    setLoading(false);
  }
  */

                axios.get("https://codingapple1.github.io/shop/data" + (btnNum + 2) + ".json")
                  .then((결과) => {
                    let copy = [...shoes, ...결과.data];
                    setShoes(copy);
                    setLoading(false);
                  })
                  .catch(() => {
                    setLoading(false);
                    alert('상품이 없습니다.');
                  })

              }}>버튼</button>

              {
                loading === true ? <Loading /> : null
              }

              <ProductList shoes={shoes} />

            </>

          }

          ></Route>
          <Route path="/detail/:id" element={
            <Context1.Provider value={{ 재고 }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          } />

          <Route path="/cart" element={<Cart />} />

          <Route path="/about" element={<About />} >
            <Route path="member" element={<div>멤버임</div>} />
            <Route path="location" element={<div>위치정보임</div>} />
          </Route>

          <Route path="/event" element={<EventPage />}>
            <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
            <Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>
          </Route>

          <Route path='/test' element={<Test/>} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </Suspense>

    </div>
  );
};

function ProductList(props) {

  let productItem = JSON.parse(localStorage.getItem('watched'));

  return (

    <div className="productListWrap">
      <h1>
        최근 본 상품
      </h1>
      <ul className="productList">
        {productItem &&
          productItem.map((a, i) => {
            return (
              <li key={i}>
                <img src={`https://codingapple1.github.io/shop/shoes${a + 1}.jpg`} width="100%" />
              </li>
            )
          })
        }
      </ul>
    </div>
  )

}


function EventPage() {

  return (
    <>
      <div>
        <h4>오늘의 이벤트</h4>
        <Outlet></Outlet>
      </div>
    </>
  )

}

function Loading() {
  return (
    <BarLoader
      color="#6d6d6d"
      cssOverride={{
        margin: "100px auto"
      }}
    />
  )
}

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
      <Link to={`/detail/${props.i}`}>
        <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="80%" />
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.price}</p>
      </Link>
    </div>

  );

};


export default App;
