import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Context1 } from "./../App.js";
import { addItem } from "../store.js";
import { useDispatch } from "react-redux";

function Detail(props) {

    let dispatch = useDispatch();

    let [fade2, setFade2] = useState('');
    let [info, setInfo] = useState(true);
    // let [num, setNum] = useState('');

    let [탭, 탭변경] = useState(0);

    useEffect(() => {
        setFade2('end')
        let a = setTimeout(() => {
            setInfo(false);
        }, 2000)
        return () => {
            clearTimeout(a);
            setFade2('')
        }
    }, []);

    /*
    useEffect(() => {
        if (isNaN(num) == true) {
            alert('그러지마세요')
        }
    }, [num]);
    */

    let { id } = useParams();

    let 찾은상품 = props.shoes.find(function (x) {
        return x.id == id
    })

    useEffect(()=>{
        let 꺼낸거 = localStorage.getItem('watched')
        꺼낸거 = JSON.parse(꺼낸거)
        꺼낸거.push(찾은상품.id)
        꺼낸거 = new Set(꺼낸거)
        꺼낸거 = Array.from(꺼낸거)
        localStorage.setItem('watched', JSON.stringify(꺼낸거))
      }, [])
      
    return (
        <div className={'container start ' + fade2}>
            <div className="row">
                {
                    info == true ?
                        <div className="alert alert-warning">
                            2초이내 구매시 할인
                        </div>
                        : null
                }

                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                {/* <input
                        onChange={(e) => { setNum(e.target.value) }}
                    /> */}
                <div className="col-md-6">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}원</p>
                    <button className="btn btn-danger" onClick={() => {
                        dispatch(addItem({ id, name: 찾은상품.title, count: 1 }))
                    }}>주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0" className="mt-5 mb-5">
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(0) }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(1) }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(2) }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent 탭={탭} />

        </div>
    )
}

function TabContent({ 탭 }) {

    let [fade, setFade] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setFade('end');
        }, 10);
        return () => {
            setFade('');
        }
    }, [탭]);

    return (
        <div className={'start ' + fade}>
            {
                [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]
            }
        </div>
    )
}

/*
function TabContent(props) {
    if (props.탭 == 0) {
        return <div>내용0</div>
    }
    if (props.탭 == 1) {
        return <div>내용1</div>
    }
    if (props.탭 == 2) {
        return <div>내용2</div>
    }
}
*/

export default Detail