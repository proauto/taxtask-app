/*eslint-disable-next-line*/
import logo from './logo.svg';
import './App.css';
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Button,Navbar,Container,Nav } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet, json, withRouter  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import data from './data.js';
//import Detail from './pages/Detail';
import Main from './pages/Main';
import About from './pages/About';
import Event from './pages/Event';
import Cart from './pages/Cart';
import Login from './pages/Login'
import Register from './pages/Register'
import {request} from './utils/axios'
import { getAuth } from './store/userSlice.js';

const Detail = lazy(()=>import('./pages/Detail.js'));

function App() {
  let dispatch = useDispatch()
  let state = useSelector((state) => state)
  let [shoes] = useState(data)
  dispatch(getAuth(state.user.id != ""))
  
  useEffect(()=>{
    if(localStorage.getItem('watched')==null){
      localStorage.setItem('watched', JSON.stringify([]))
    }
  },[])

  return (
    <div className="App">
       { state.authenticated && <Navigation /> }
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
        <Route path="/login" element={<Login/>}/> 
        <Route path="/register" element={<Register/>}/> 
        </Routes>
      </Suspense>
    </div>
  );
}

function Navigation(){
  let navigate = useNavigate()
  return(
      <Navbar bg="light" variant="light" >
        <Container>
          <Navbar.Brand onClick={()=>navigate('/')}>TaxTask</Navbar.Brand>


          
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate('/about')}>거래처관리</Nav.Link>
            <Nav.Link onClick={()=>navigate('/event')}>할일관리</Nav.Link>
            <Nav.Link onClick={()=>navigate('/cart')}>일정관리</Nav.Link>
            <Nav.Link onClick={()=>navigate('/login')}>노트</Nav.Link>
            <Nav.Link onClick={()=>navigate('/about')}>민원서류</Nav.Link>
            <Nav.Link onClick={()=>navigate('/about')}>매출비용TABLE</Nav.Link>
            <Nav.Link onClick={()=>navigate('/about')}>공문발송</Nav.Link>
            <Nav.Link onClick={()=>navigate('/about')}>웹스토리지</Nav.Link>
            <Nav.Link onClick={()=>navigate('/login')}>로그인</Nav.Link>
            <Nav.Link onClick={()=>navigate('/register')}>회원가입</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}


export default App; 
