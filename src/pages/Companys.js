import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Button, Navbar, Container, Nav, ListGroup, Stack  } from 'react-bootstrap';

function Companys() {
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3 mt-4">
                <Stack gap={3}>
                    <Button variant="primary" class="col-md-6 float-left" size="lg">거래처관리</Button>
                    <div class="row">
                        <h2 class="col-md-3">거래처 </h2>
                        <h2 class="col-md-6"> </h2>
                        <h2 class="col-md-3"> 정렬</h2>
                    </div>
                    <div class="container">
                        <input type='text' class="mb-4"/>

                        <ListGroup as="ul">
                        <Stack gap={4}>
                            <ListGroup.Item as="li" active>
                                업체1
                            </ListGroup.Item>
                            <ListGroup.Item as="li">업체2</ListGroup.Item>
                            <ListGroup.Item as="li" disabled>
                                업체3
                            </ListGroup.Item>
                            <ListGroup.Item as="li">업체4</ListGroup.Item>
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
                            <hr/>
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

export default Companys;