import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login'

function Corporatetax(props) {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let state = useSelector((state) => state)




  return (<>
    <div ></div>
    <div className="container">
      오늘도 화이팅


    </div>
  </>
  )
}

export default Corporatetax