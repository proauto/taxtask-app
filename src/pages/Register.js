import React, { useState, useEffect} from 'react';
import { Routes, Route, Link, useNavigate, Outlet, json, withRouter  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import {request} from '../utils/axios'
import { setUser, increase, getAuth } from '../store/userSlice.js';

function Register(props){

    let navigate = useNavigate()
    let state = useSelector((state) => state)
    let dispatch = useDispatch()
    let [alert, setAlert] = useState(false);
    let [err_message, setErrmessage] = useState('')
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    
    useEffect(() =>{
        let a = setTimeout(()=>{ setAlert(false)  },2000)
        return ()=>{
        clearTimeout(a)
        }
    }, [err_message])
    
    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    const onClickRegister = (e) =>{
        e.preventDefault();
        
        let data = JSON.stringify({
            'id' : inputId,
            'pw' : inputPw
        })

        axios.post('/register',
        data, {
        headers: {
              "Content-Type": `application/json`,
        },}).then(
            (res) =>{
                console.log('성공')
                console.log(res.data)
                navigate('/')
            }
        )
        .catch ((error) => {
            console.log('실패')
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);

                if(error.response.data == 'Bad Request'){
                    setErrmessage('입력해주세요')
                    setAlert(true)
                }
                else if(error.response.data == 'Unauthorized'){
                    setErrmessage('아이디나 비밀번호가 틀렸습니다.')
                    setAlert(true)
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
        })
        
    }
    return (
        <div>
        <div className="container mt-4"> 
            <form> 
                <div className="form-group"> 
                <label>아이디</label> 
                <input type="text" className="form-control" name="id" value={inputId} onChange={handleInputId}/> 
                </div> 
                <div className="form-group"> 
                <label>비번</label> 
                <input type="password" className="form-control" name="pw" value={inputPw} onChange={handleInputPw}/> 
                </div> 
                <button type="submit" className="btn btn-danger"  onClick={onClickRegister}>회원가입</button> 
            </form> 
            {
                alert == false
                ? null
                : <Alert err_message={err_message}/>
            }
        </div> 
        </div>
    )
}


function Alert(props){
    return(
      <div className="alert alert-warning">
          {props.err_message}
      </div>  
    )
}


export default Register;