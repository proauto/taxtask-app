import { useNavigate } from 'react-router-dom'
import { Button, Navbar, Container, Nav, ListGroup, Stack, Modal, Form, ButtonGroup } from 'react-bootstrap';
import axios from 'axios'
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login'

function Valueaddedtax(props) {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let state = useSelector((state) => state)

    let [names, setNames] = useState([])

    //개별 거래처 클릭
    const clickAccount = (params, e) => {
        e.preventDefault();

        /* setPick(accounts.find((element) => {
            if (element.name === params) {
                return true;
            }
        }));

        console.log(pick) */
    };

    return (<>
        <div ></div>
        <div className="container">
            오늘도 화이팅

            <ButtonGroup aria-label="Basic example">
                <Button variant="secondary">Left</Button>
                <Button variant="secondary">Middle</Button>
                <Button variant="secondary">Right</Button>
            </ButtonGroup>

            <div class="container">
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

        </div>
    </>
    )
}

export default Valueaddedtax