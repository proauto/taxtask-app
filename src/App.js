/*eslint-disable-next-line*/
import logo from './logo.svg';
import './App.css';
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet, json, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import data from './data.js';
import Main from './pages/Main';
import Accounts from './pages/Accounts';
import Accountsedit from './pages/Accountsedit';
import Todo from './pages/Todo';
import Login from './pages/Login'
import Note from './pages/Note'
import Corporatetax from './pages/Corporatetax'
import Incometax from './pages/Incometax'
import Valueaddedtax from './pages/Valueaddedtax'
import Withholdingtax from './pages/Withholdingtax'
import Register from './pages/Register'
import { request } from './utils/axios'
import { getAuth } from './store/userSlice.js';

function App() {
  let dispatch = useDispatch()
  let state = useSelector((state) => state)
  let [shoes] = useState(data)
  dispatch(getAuth(state.user.id != ""))

  useEffect(() => {
    if (localStorage.getItem('watched') == null) {
      localStorage.setItem('watched', JSON.stringify([]))
    }
  }, [])

  return (
    <div className="App">
      {!state.authenticated && <Topnav />}

      <Suspense fallback={<div>로딩중입니다.</div>}>
        <Routes>
          <Route path="/" element={<Main shoes={shoes} />} />
          <Route path="/accounts" element={<Accounts />}/>
          <Route path="/accountsedit" element={<Accountsedit />}></Route>
            
          <Route path="*" element={<div>없는 페이지에요</div>} />

          <Route path="/todo" element={<Todo />}>
            <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
          </Route>
          <Route path="/note" element={<Note />} />
          <Route path="/corporatetax" element={<Corporatetax />} />
          <Route path="/incometax" element={<Incometax />} />
          <Route path="/valueaddedtax" element={<Valueaddedtax />} />
          <Route path="/withholdingtax" element={<Withholdingtax />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </div>
  );
}


//공통 컴포넌트 > 네비게이션바, 사이드바
function Topnav() {
  let navigate = useNavigate()
  return (
    <Navbar bg="light" variant="light" >
      <Container>
        <Navbar.Brand onClick={() => navigate('/')}>TaxTask</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate('/accounts')}>거래처관리</Nav.Link>
          <Nav.Link onClick={() => navigate('/todo')}>할일관리</Nav.Link>
          <Nav.Link onClick={() => navigate('/note')}>노트</Nav.Link>
          <Nav.Link onClick={() => navigate('/valueaddedtax')}>부가가치세</Nav.Link>
          <Nav.Link onClick={() => navigate('/incometax')}>소득세</Nav.Link>
          <Nav.Link onClick={() => navigate('/corporatetax')}>법인세</Nav.Link>
          <Nav.Link onClick={() => navigate('/withholdingtax')}>원천세</Nav.Link>

          <Nav.Link onClick={() => navigate('/about')}>민원서류-예정</Nav.Link>
          <Nav.Link onClick={() => navigate('/about')}>매출비용TABLE-예정</Nav.Link>
          <Nav.Link onClick={() => navigate('/about')}>공문발송-예정</Nav.Link>
          <Nav.Link onClick={() => navigate('/about')}>웹스토리지-예정</Nav.Link>
          <Nav.Link onClick={() => navigate('/login')}>로그인</Nav.Link>
          <Nav.Link onClick={() => navigate('/register')}>회원가입</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default App; 
