import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Button, Navbar, Container, Nav, ListGroup, Stack } from 'react-bootstrap';
import React, { lazy, Suspense, useEffect, useState } from "react";
import axios from 'axios';

function Accounts() {

    //accounts : 거래처리스트, serachInput : 거래처검색
    let [accounts, setAccounts] = useState([])
    const [serachInput, setSearchInput] = useState("");
    let navigate = useNavigate()


    //검색 기능
    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    //거래처 리스트 받기
    useEffect(() => {
        axios.get('/accounts_data', 
        {
            params : {'manager' : '이홍규'}
        }
        ).then((결과) => {
            setAccounts(결과.data)
            console.log(결과.data)

        }).catch((에러) => {
            console.log(에러)
        })
    }, [])



    //거래처 추가 버튼
    const onClickAdd = (e) => {
        /*
        e.preventDefault();

        // 비밀번호  8 ~ 10자 영문, 숫자 조합
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
        if (regExp.test('')) {

            console.log("비밀번호 유효")

            let data = JSON.stringify({
                'id': '',
                'pw': ''
            })

            axios.post('/register',
                data, {
                headers: {
                    "Content-Type": `application/json`,
                },
            }).then(
                (res) => {
                    console.log('성공')
                    console.log(res.data)
                    navigate('/')
                }
            )
                .catch((error) => {
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
        } else {
            console.log("비밀번호 무효")

        }
        */
    }







    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3 mt-4">
                    <Stack gap={3}>
                        <Button variant="primary" class="col-md-6 float-left" size="lg" onClick={onClickAdd}>거래처관리</Button>
                        <div class="row">
                            <h2 class="col-md-3">거래처 </h2>
                            <h2 class="col-md-6"> </h2>
                            <h2 class="col-md-3"> 정렬</h2>
                        </div>
                        <div class="container">
                            <input type='text' class="mb-4"  handleChange={handleChange}/>

                            <ListGroup as="ul">
                                <Stack gap={accounts.length}>
                                    {accounts.map((a, i) => {

                                        console.log(accounts.length)
                                        return (
                                            <ListGroup.Item as="li">{a.name}</ListGroup.Item>
                                        )
                                    })
                                    }
                                </Stack>
                            </ListGroup>
                        </div>

                    </Stack>
                </div>

                <div class="col-md-9 mt-4">
                    <div class="container">
                        <h4 class="col-md-12">더존비즈온</h4>
                        <Button variant="primary" class="col-md-12 float-left mt-5">수정</Button>

                        <div class="container mt-5">
                            <h4 class="col-md-12">기본정보</h4>
                            <hr />
                            <div class="row">
                                <div class="container col-md-6">

                                    <p>그룹</p>
                                    <p>구분</p>
                                    <p>사업자등록번호</p>
                                    <p>종사업장번호</p>
                                    <p>법인등록번호</p>
                                    <p>업태</p>
                                </div>
                                <div class="container col-md-6">
                                    <p>-</p>
                                    <p>법인사업자</p>
                                    <p>106-45-21569</p>
                                    <p>-</p>
                                    <p>-</p>
                                    <p>서비스업</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accounts;