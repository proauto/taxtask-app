import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Button, Navbar, Container, Nav, ListGroup, Stack, Modal, Form } from 'react-bootstrap';
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import '../App.css';
import { ch2pattern, createFuzzyMatcher } from '../utils/ch2pattern'

function Todo(props) {

    //todo : 거래처리스트, serachInput : 거래처검색 pick : 선택한 거래처
    let state = useSelector((state) => state)
    let initialnote = {
        id: 0,
        name: '',
        body: '',
        duedate: '',
        ing: '',
        manager: '이홍규',
    }

    let [todo, setTodo] = useState([])
    let [initialtodoname, setIntialtodoname] = useState([])
    let [names, setNames] = useState([])
    let [newNote, setNewnote] = useState(initialnote)
    let [pick, setPick] = useState([])
    let navigate = useNavigate()

    //거래처 추가 버튼
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true) };

    //modal 자료 입력
    const handleInputData = (e) => {

        let caseName = e.target.id

        const changeCondition = (key, value) => {
            setNewnote((newNote) => {
                let newCondition = { ...newNote };
                newCondition[key] = value;
                return newCondition;
            });
        };

        switch (caseName) {
            case 'nameForm':
                changeCondition('name', e.target.value)
                break;
            case 'bodyForm':
                changeCondition('body', e.target.value)
                break;
            case 'duedateForm':
                changeCondition('duedate', e.target.value)
                break;
            case 'ingForm':
                changeCondition('ing', e.target.value)
                break;
            case 'managerForm':
                changeCondition('manager', e.target.value)
                break;

        }

        console.log(newNote)
    }

    const handleOk = (e) => {

        e.preventDefault();

        let data = JSON.stringify(newNote)
        console.log(data)

        axios.post('/todo_data',
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
        setNewnote(initialnote)

    }


    //거래처 리스트 받기
    useEffect(() => {
        axios.get('/todo_data',
            {
                params: { 'manager': '이홍규' }
            }
        ).then((결과) => {
            console.log(결과.data)
            setTodo(결과.data)
            setIntialtodoname(결과.data.map(row => row.name))
            setNames(결과.data.map(row => row.name))

        }).catch((에러) => {
            console.log(에러)
        })
    }, [])

    //개별 거래처 클릭
    const clickAccount = (params, e) => {
        e.preventDefault();

        setPick(todo.find((element) => {
            if (element.name === params) {
                return true;
            }

        }));

        console.log(pick)
    };


    //검색 기능
    const handleChange = (e) => {
        const query = e.target.value;
        const regex = createFuzzyMatcher(query);
        const words = initialtodoname;
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



    return (
        <div class="container-fluid">

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>할일 등록</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="nameForm" onChange={handleInputData}>
                            <Form.Label>제목</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="bodyForm" onChange={handleInputData}>
                            <Form.Label>특이사항</Form.Label>
                            <Form.Control as="textarea" rows={5} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="duedateForm" onChange={handleInputData}>
                            <Form.Label>디데이</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="ingForm" onChange={handleInputData}>
                            <Form.Label>진행도</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                            />
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
                <div class="col-md-2 mt-4">
                    <Stack gap={3}>
                        <div class="row">
                            <Button variant="primary" id="plus" class="col-md-12 float-left" size="lg" onClick={handleShow}>거래처추가</Button>
                        </div>
                        <div class="row">
                            <Button class="col-md-10 float-left" size="lg" >내 할일</Button>
                        </div>
                        <div class="row">
                            <Button class="col-md-10 float-left" size="lg" >중요 할일</Button>
                        </div>
                        <div class="row">
                            <Button class="col-md-10 float-left" size="lg" >완료된 일</Button>
                        </div>
                    </Stack>
                </div>

                <div class="col-md-10 mt-4">
                    <input type='text' class="mb-4 col-md-8" onChange={handleChange} />
                    <div class="row">
                        <div class="container col-md-8">
                            <div class="container">
                                <ListGroup class='todoList' defaultActiveKey="#link1">
                                    <Stack gap={names.length}>
                                        {names.map((a, i) => {
                                            return (
                                                <ListGroup.Item action onClick={(e) => { clickAccount(a, e) }}> {a}</ListGroup.Item>
                                            )
                                        })
                                        }
                                    </Stack>
                                </ListGroup>
                            </div>
                        </div>

                        <div class="container col-md-4">
                            <div class="container">
                                <ListGroup class='todoList' defaultActiveKey="#link1">
                                    <Stack gap={names.length}>
                                        {names.map((a, i) => {
                                            return (
                                                <ListGroup.Item action onClick={(e) => { clickAccount(a, e) }}> {a}</ListGroup.Item>
                                            )
                                        })
                                        }
                                    </Stack>
                                </ListGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo;