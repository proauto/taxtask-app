import {createSlice} from '@reduxjs/toolkit'


let user = createSlice({
    name : 'user',
    initialState : {id :'kim', pw : 20},
    reducers :{
        setUser(state, action){
            state.name =  action.payload
           
        },
        increase(state, action){
            state.age += action.payload
           
        }
    }
})



export let { setUser, increase } = user.actions


export default user