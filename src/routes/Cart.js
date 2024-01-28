import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increase } from './../store/userSlice.js';
import { memo, useState } from 'react';
import { addCount } from './../store.js';


function Cart() {

    let state = useSelector((state) => { return state });
    let dispatch = useDispatch();

    return (
        <div>

            <h1>{state.user.name} {state.user.age}의 장바구니</h1>
            <button onClick={() => { dispatch(increase(10)) }}>버튼</button>

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
                    {
                        state.cart.map((a, i) => {

                            return (
                                <tr key={i}>
                                    <td>{state.cart[i].id}</td>
                                    <td>{state.cart[i].name}</td>
                                    <td>{state.cart[i].count}</td>
                                    <td>
                                        <button onClick={() => {
                                            // dispatch(changeName())
                                            dispatch(addCount(state.cart[i].id));
                                        }}>+</button>
                                    </td>
                                </tr>
                            )

                        })
                    }


                </tbody>
            </Table>
        </div>
    )
}

export default Cart