import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Button, Navbar, Container, Nav, ListGroup, Stack, Modal, Form } from 'react-bootstrap';
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { ch2pattern, createFuzzyMatcher } from '../utils/ch2pattern'

function Accountedit() {
   
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

   return (
      <div>
         <h4>거래처 수정</h4>
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

         <Button variant="secondary" onClick={handleClose}>
            닫기
         </Button>
         <Button variant="primary" onClick={handleOk}>
            저장
         </Button>
      </div>
   )
}

export default Accountedit;