import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice.js';

/*
let user = createSlice({
    name: 'user',
    initialState: 'park',
    reducers : {
        changeName(state){
            return 'seok' + state
        }
    }
})

export let {changeName} = user.actions
*/


let stock = createSlice({
    name: 'stock',
    initialState: [10, 11, 12]
})

let cart = createSlice({
    name: 'cart',
    initialState: [

        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }

    ],
    reducers: {
        addCount(state, action) {
            state.findIndex((a) => {
                let 번호 = state.findIndex((a) => a.id === action.payload
                )
                state[번호].count++
            })
        },
        addItem(state, action) {
            state.push(action.payload)
        }

    }
})

export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        cart: cart.reducer
    }
})

export let { addCount, addItem } = cart.actions