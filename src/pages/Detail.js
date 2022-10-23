import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Nav, TabContent } from 'react-bootstrap' ;
import {addItem} from '../store.js'

function Detail(props){

  let {id} = useParams();
  let 찾은상품 = props.shoes.find(function(x){
    return x.id == id
  });
  let shoes_num = String(parseInt(id)+1);
  let [alert, setAlert] = useState(true);
  let [탭,탭변경] = useState(0);
  let [fadeall,setFadeall] = useState('')
  let dispatch = useDispatch()

  useEffect(()=>{
    let 최근확인 = JSON.parse(localStorage.getItem('watched'))
    if(최근확인.slice(-1)!=id){
      최근확인.push(id)
      localStorage.setItem('watched', JSON.stringify(최근확인))
    }
  })


  useEffect(() =>{
      let a = setTimeout(()=>{ setAlert(false)  },2000)
      return ()=>{
        clearTimeout(a)
      }
  }, [])


  useEffect(()=>{
    setTimeout(()=> { setFadeall('end')}, 100)
    return ()=>{
      setFadeall('')
    }
  },[])

    return(
      <div className={'container start ' + fadeall}>
        {
          alert == false
          ? null
          : <Alert/>
        }
        <div className="row">
          <div className="col-md-6">
            <img src={process.env.PUBLIC_URL+ '/shoes'+ shoes_num +'.jpg'} width="100%" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{찾은상품.title}</h4>
            <p>{찾은상품.content}</p>
            <p>{찾은상품.price}</p>
            <button className="btn btn-danger" onClick={()=>{
              dispatch(addItem({id : 1, name : 찾은상품.title, count : 1}))
            }}>주문하기</button> 
            
          </div>
        </div>
        <Nav variant="tabs"  defaultActiveKey="link0">
    <Nav.Item>
      <Nav.Link eventKey="link0" onClick={()=>{탭변경(0)}}>버튼0</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link1" onClick={()=>{탭변경(1)}}>버튼1</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link2" onClick={()=>{탭변경(2)}}>버튼2</Nav.Link>
    </Nav.Item>
</Nav>

        <Tabcontent 탭={탭}/>

    </div> 
  )
}

function Tabcontent({탭}){

  let [fade,setFade] = useState('')

  useEffect(()=>{
    setTimeout(()=> { setFade('end')}, 100)
    return ()=>{
      setFade('')
    }
  },[탭])

  return( <div className={'start ' + fade}>
  {[<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][탭]}
  </div>) 
}

function Alert(props){
    return(
      <div className="alert alert-warning">
          2초이내 구매시 할인
      </div>  
    )
}

  export default Detail;