import {createSlice} from '@reduxjs/toolkit'
import { isCompositeComponent } from 'react-dom/test-utils'

let user = createSlice({
    name : 'user',
    initialState : {
        id: "",
        pw : ""
    },
    reducers :{
        setUser(state, action){
            console.log(action.payload)
            console.log(action.payload.id)
            console.log(action.payload.pw)
            console.log({...state, id :action.payload.id, pw : action.payload.pw})
            return {...state, id :action.payload.id, pw : action.payload.pw}
        },
    }
})

let authenticated = createSlice({
    name: 'authenticated',
    initialState : false,
    reducers:{
        getAuth(state, action){
            
            return action.payload
        },
    }
})

export let { setUser, } = user.actions
export let { getAuth, } = authenticated.actions

export {user, authenticated}