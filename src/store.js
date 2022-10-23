import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'


let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

let item = createSlice({
    name : 'item',
    initialState : 
    [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers :{
        addCount(state, action){
            let 검색결과 = state.find((a) =>{
                return a.id == action.payload     
            });

            검색결과.count++  
        },
        addItem(state,action){
            state.push(action.payload)
        },
        deleteItem(state,action){
            state.splice(action.payload,action.payload+1)
        }
    } 
})


export let { addCount, addItem, deleteItem } = item.actions


export default configureStore({
  reducer: { 
    user : user.reducer,
    stock : stock.reducer,
    item : item.reducer
  }
}) 