import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login'

function Main(props) {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let state = useSelector((state) => state)

  /* // 로그인 안하면 무조건 로그인페이지로 보낸다 >> 개발끝나고 주석 해제
  if(state.authenticated == false){

    return(<Login/>)   
  } 
  */
  return (<>
    <div ></div>
    <div className="container">
      오늘도 화이팅


    </div>
  </>
  )
}

export default Main