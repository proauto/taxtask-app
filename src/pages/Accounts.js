import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Button, Navbar, Container, Nav, ListGroup, Stack, Modal, Form } from 'react-bootstrap';
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import '../App.css';
import { ch2pattern, createFuzzyMatcher } from '../utils/ch2pattern'

function Accounts() {

    //accounts : 거래처리스트, serachInput : 거래처검색 pick : 선택한 거래처
    
    let state = useSelector((state) => state)
    let initialnewaccount = {
        id: 0,
        name: '',
        case: '개인',
        category: '',
        num_account: '',
        ceo: '',
        num_corporation: '',
        phone: '',
        type: '',
        open_day: '',
        manager: '이홍규',
        etc: '',
    }
    let [accounts, setAccounts] = useState([])
    let [newaccount, setNewaccount] = useState(initialnewaccount)
    let [pick, setPick] = useState([])
    let [initialnames, setInitialNames] = useState([])
    let [names, setNames] = useState([])
    let [editswitch, setEditswitch] = useState(true)
    let navigate = useNavigate()

    //거래처 추가 버튼
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {

        console.log(editswitch)
        console.log(pick.name)
        let caseName = e.target.id
        console.log(e.target.id)
        if (caseName == 'edit') {
            setEditswitch(false)
        } else if (caseName == 'plus') {
            setEditswitch(true)
        }
        setShow(true)
    };

    const handleInputData = (e) => {

        let caseName = e.target.id

        const changeCondition = (key, value) => {
            setNewaccount((newaccount) => {
                let newCondition = { ...newaccount };
                newCondition[key] = value;
                return newCondition;
            });
        };
        console.log(e.target.value)
        console.log(e.target.id)
        switch (caseName) {
            case 'nameForm':
                changeCondition('name', e.target.value)
                break;
            case 'caseForm':
                changeCondition('case', e.target.value)
                break;
            case 'categoryForm':
                changeCondition('category', e.target.value)
                break;
            case 'num_accountForm':
                changeCondition('num_account', e.target.value)
                break;
            case 'ceoForm':
                changeCondition('ceo', e.target.value)
                break;
            case 'num_corporationForm':
                changeCondition('num_corporation', e.target.value)
                break;
            case 'phoneForm':
                changeCondition('phone', e.target.value)
                break;
            case 'typeForm':
                changeCondition('type', e.target.value)
                break;
            case 'open_dayForm':
                changeCondition('open_day', e.target.value)
                break;
            case 'etcForm':
                changeCondition('etc', e.target.value)
                break;
        }

        console.log(newaccount)
    }

    const handleOk = (e) => {

        e.preventDefault();

        let data = JSON.stringify(newaccount)
        console.log(data)

        axios.post('/accounts_data',
            data, {
            headers: {
                "Content-Type": `application/json`,
            },
        }).then(
            (res) => {
                console.log('성공')
                console.log(res.data)
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

        setShow(false)
        setNewaccount(initialnewaccount)

    }

    //거래처 리스트 받기
    useEffect(() => {
        axios.get('/accounts_data',
            {
                params: { 'manager': '이홍규' }
            }
        ).then((결과) => {
            console.log(결과.data)
            setAccounts(결과.data)
            setInitialNames(결과.data.map(row => row.name))
            setNames(결과.data.map(row => row.name))

        }).catch((에러) => {
            console.log(에러)
        })
    }, [])

    //검색 기능
    const handleChange = (e) => {
        const query = e.target.value;
        const regex = createFuzzyMatcher(query);
        const words = initialnames;
        const copy = [];

        for (let i = 0; i < words.length; i++) {
            console.log(words.length)
            console.log(i)
            if (regex.test(words[i].toLowerCase())) {
                copy.push(words[i])
            }
        }
        setNames(copy);
    };




    //개별 거래처 클릭
    const clickAccount = (params, e) => {
        e.preventDefault();

        setPick(accounts.find((element) => {
            if (element.name === params) {
                return true;
            }

        }));

        console.log(pick)
    };

    //거래처 수정 클릭
    const clickEditAccount = (e) => {
        console.log(e)

        navigate('/accountsedit')

        /* axios.put('/account', {
            params: {
                _id: pick._id
            },
            firstName: 'Fred',
            lastName: 'Flintstone'
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            }); */

    }

    return (
        <div class="container-fluid">
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>거래처 추가</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="nameForm" onChange={handleInputData}>
                            <Form.Label>이름</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="num_accountForm" onChange={handleInputData}>
                            <Form.Label>사업자등록번호</Form.Label>
                            <Form.Control
                                type="text"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phoneForm" onChange={handleInputData}>
                            <Form.Label>전화번호</Form.Label>
                            <Form.Control
                                type="text"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" onChange={handleInputData}>
                            <Form.Label>구분</Form.Label>
                            <Form.Select class="form-control" controlId="caseForm">
                                <option>개인</option>
                                <option>법인</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="typeForm" onChange={handleInputData}>
                            <Form.Label>업태</Form.Label>
                            <Form.Control
                                type="text"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="ceoForm" onChange={handleInputData}>
                            <Form.Label>대표자</Form.Label>
                            <Form.Control
                                type="text"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="categoryForm" onChange={handleInputData}>
                            <Form.Label>과세유형</Form.Label>
                            <Form.Control
                                type="text"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="etcForm" onChange={handleInputData}
                        >
                            <Form.Label>특이사항</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={handleOk}>
                        저장
                    </Button>
                </Modal.Footer>
            </Modal>




            <div class="row">
                <div class="col-md-3 mt-4">
                    <Stack gap={3}>
                        <Button variant="primary" id="plus" class="col-md-6 float-left" size="lg" onClick={handleShow}>거래처추가</Button>
                        <div class="row">
                            <h2 class="col-md-3">거래처 </h2>
                            <h2 class="col-md-6"> </h2>
                            <h2 class="col-md-3"> 정렬</h2>
                        </div>
                        <div class="container">
                            <input type='text' class="mb-4" onChange={handleChange} />

                            <ListGroup class='namesList' defaultActiveKey="#link1">
                                <Stack gap={names.length}>
                                    {names.map((a, i) => {
                                        console.log(names.length)
                                        return (
                                            <ListGroup.Item action onClick={(e) => { clickAccount(a, e) }}> {a}</ListGroup.Item>
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
                        <h4 class="col-md-12">{pick.name}</h4>
                        <Button variant="primary" id='edit' class="col-md-12 float-left mt-5" onClick={clickEditAccount}>수정</Button>

                        <div class="container mt-5">
                            <h4 class="col-md-12">기본정보</h4>
                            <hr />
                            <div class="row">
                                <div class="container col-md-6">

                                    <p>전화번호</p>
                                    <p>구분</p>
                                    <p>사업자등록번호</p>
                                    <p>종사업장번호</p>
                                    <p>법인등록번호</p>
                                    <p>업태</p>
                                    <p>대표자</p>
                                    <p>과세유형</p>
                                </div>
                                <div class="container col-md-6">
                                    <p>{pick.phone}</p>
                                    <p>{pick.case}</p>
                                    <p>{pick.num_account}</p>
                                    <p>-</p>
                                    <p>-</p>
                                    <p>{pick.type}</p>
                                    <p>{pick.ceo}</p>
                                    <p>{pick.category}</p>
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