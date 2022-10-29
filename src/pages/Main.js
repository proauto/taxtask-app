import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login'

function Main(props) {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [shoes, setShoes] = useState(props.shoes)
  let state = useSelector((state) => state)

  /* // 로그인 안하면 무조건 로그인페이지로 보낸다 >> 개발끝나고 주석 해제
  if(state.authenticated == false){

    return(<Login/>)   
  } 
  */
  return (<>
    <div className="main-bg"></div>
    <div className="container">
      <div className="row">

        {shoes.map((a, i) => {
          return (
            <Card shoes={shoes[i]} image={i + 1} i={i} />
          )
        })
        }
      </div>
    </div>

    <button onClick={() => {
      //로딩중 UI 띄우기
      axios.get('https://codingapple1.github.io/shop/data2.json').then((결과) => {

        let copy1 = [...shoes, ...결과.data];
        console.log(copy1)
        setShoes(copy1);
        //로딩중 UI 없애기

      }).catch(() => {
        console.log('실패함ㅅㄱ')
      })

      //2개이상get 성공하면 실행
      Promise.all([axios.get('/url1'), axios.get('/url2')]).then(() => {

      })

    }}>더보기</button>
  </>
  )
}


function Card(props) {
  let navigate = useNavigate()
  return (
    <div className="col-md-4">
      <img src={process.env.PUBLIC_URL + '/shoes' + props.image + '.jpg'} onClick={() => navigate('/detail/' + props.i)} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  )
}

export default Main