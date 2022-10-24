import React, { useState, useEffect} from 'react';
import { Routes, Route, Link, useNavigate, Outlet, json, withRouter  } from 'react-router-dom'
import axios from "axios";

function Login(){
    let navigate = useNavigate()
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    const onClickLogin = (e) =>{
        e.preventDefault();
        
        let data = JSON.stringify({
            'id' : inputId,
            'pw' : inputPw
        })
        console.log(data)
        axios.post('/login',
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
        <div class="container mt-4"> 
            <form> 
                <div class="form-group"> 
                <label>아이디</label> 
                <input type="text" class="form-control" name="id" value={inputId} onChange={handleInputId}/> 
                </div> 
                <div class="form-group"> 
                <label>비번</label> 
                <input type="password" class="form-control" name="pw" value={inputPw} onChange={handleInputPw}/> 
                </div> 
                <button type="submit" class="btn btn-danger"  onClick={onClickLogin}>로그인</button> 
            </form> 
        </div> 
        </div>
    )
}

export default Login;