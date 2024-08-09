import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { changeName, increase } from "./../store/userSlice.js"
import { addCount, deleteItem } from "../store.js"
import { memo, useState } from "react"

function Cart() {

    let state = useSelector((state) => { return state });
    let dispatch = useDispatch();
    let [count, setCount] = useState(0);

    return (
        <div className="mt-5">

            <Child count={count}></Child>
            <button onClick={() => {
                setCount(count + 1);
            }}>+</button>

            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <button className="mt-3" onClick={() =>
                dispatch(increase(10))
            }>버튼</button>

            <Table className="mt-5">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((a, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{state.cart[i].name}</td>
                                    <td>{state.cart[i].count}</td>
                                    <td><button onClick={() => {
                                        dispatch(addCount(state.cart[i].id))
                                    }}>+</button></td>
                                    <td>
                                        <button onClick={() => { dispatch(deleteItem(a.id)) }}>
                                            삭제
                                        </button>
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

let Child = memo(function() {

    console.log('재렌더링됨');
    return <div>자식임</div>

})

export default Cart