import { memo, useState} from 'react'
import {Table} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { setUser, increase } from '../store/userSlice.js';
import { addCount, deleteItem } from '../store.js'

let Child = memo(function(){
    console.log('재렌더링됨')
    return <div>자식임</div>
})

function Cart(){

    let state = useSelector((state) => state)
    let dispatch = useDispatch()
    let [count, setCount] = useState(0)
    
    return(
        <div>
            <Child></Child>
            <button onClick={()=>{setCount(count+1)}}>+</button>
            <h6>{state.user.name}{state.user.age}의 장바구니</h6>
            <button onClick={()=>{dispatch(increase(100))}}>버튼</button>
           <Table>
            <thead>
                <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
            {state.item.map((a,i) => 
                <tr key={i}>
                    <td>{state.item[i].id}</td>
                    <td>{state.item[i].name}</td>
                    <td>{state.item[i].count}</td>
                    <td><button onClick={()=>{
                        dispatch(addCount(state.item[i].id))
                    }}>+</button> 
                    <button onClick={()=>{
                        dispatch(deleteItem(i))
                    }}>삭제</button>
                    </td>
                    
                </tr>
                    
            )}



            </tbody>
            </Table> 
        </div>
    )
}

export default Cart;