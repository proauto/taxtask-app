/*eslint-disable-next-line*/
import logo from './logo.svg';
import './App.css';
import { lazy, Suspense, useEffect, useState } from "react";
import { Button,Navbar,Container,Nav } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet, json } from 'react-router-dom'
import data from './data.js';
//import Detail from './pages/Detail';
import Main from './pages/Main';
import About from './pages/About';
import Event from './pages/Event';
import Cart from './pages/Cart';

const Detail = lazy(()=>import('./pages/Detail.js'));

function App() {
  
  let [shoes] = useState(data)
  let navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('watched')==null){
      localStorage.setItem('watched', JSON.stringify([]))
    }
  },[])

  return (
    <div className="App">
      <Navbar bg="light" variant="light" >
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate('/')} >Home</Nav.Link>
            <Nav.Link onClick={()=>navigate('/about')}>About</Nav.Link>
            <Nav.Link onClick={()=>navigate('/event')}>Event</Nav.Link>
            <Nav.Link onClick={()=>navigate('/cart')}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>로딩중입니다.</div>}>
      <Routes>
        <Route path="/" element={ <Main shoes={shoes}/>}/>
        <Route path="/detail/:id" element={<Detail shoes={shoes}/>}/>
        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤버임</div>}/>
          <Route path="location" element={<div>위치정보임</div>}/>
        </Route>
        <Route path="*" element={<div>없는 페이지에요</div>}/>

        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
        </Route>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      </Suspense>
    </div>
  );
}

export default App;
