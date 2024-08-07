import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from './store/userSlice.js'

let stock = createSlice({

    name: 'stock',
    initialState: [10, 11, 12]

})

let cart = createSlice({

    name: 'cart',
    initialState: [
        {
            id: 0,
            name: 'White and Black',
            count: 2
        },
        {
            id: 2,
            name: 'Grey Yordan',
            count: 1
        },
    ],
    reducers: {
        addCount(state, action) {
            let 번호 = state.findIndex((a) => { return a.id === action.payload });
            state[번호].count++;
        },
        addItem(state, action) {
            let product = state.find((a) => { return a.id === action.payload.id });
            if (product === undefined) {
                alert("상품이 추가되었습니다.");
                state.push(action.payload);
            } else {
                alert("중복된 상품입니다.");
            }
        },
        deleteItem(state, action) {
            return state.filter((a) => {
                return a.id != action.payload;
            })
        }
    }

})

export let { addCount, addItem, deleteItem } = cart.actions

export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        cart: cart.reducer,
    }
})
