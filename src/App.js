import React, { useContext, useEffect, useRef, useState } from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Context from './helper/context';
import counterStore from './store/counter';
import { observer } from "mobx-react-lite";
import { useWindiwScroll } from "./hooks/useWindiwScroll.js";
import { useLocalStorage } from "./hooks/useLocalStorage";
import './App.css';
import Layout from "./Layout";
import Board from "./Board";
import Article from "./Article";
import Login from "./Login";
import Notfound from "./Notfound";

function getDefaultValue() {
  let num = 0;
  for (let i = 0; i < 10000; i++) {
    num += i;
  }
  return num;
}

function Counter(props) {
  const [ count, setCount ] = useState(() => {
    if (!props.count) {
      return getDefaultValue();
    }
    return props.count;
  });
  return (
    <button onClick={() => {
      setCount(count + 1);
    }}>{count}</button>
  );
}

function ComA() {
  const count = useContext(Context);
  return (
    <div>
      this is ComA
      <br/>
      app傳來的資料： {count}
      <ComC/>
    </div>
  );
}

function ComC() {
  const count = useContext(Context);
  return (
    <div>
      this is ComC
      <br/>
      app傳來的資料： {count}
    </div>
  );
}

function App() {
  const [ count, setCount ] = useState(0);
  const [ name, setName ] = useState('zs');
  const [ flag, setFlag ] = useState(true);
  const [ list, setList ] = useState([]);
  const [ y ] = useWindiwScroll();
  const testRef = useRef(null);
  const h1Ref = useRef(null);
  const [ message, setMessage ] = useLocalStorage('hook-key', 'Fei');
  setTimeout(() => {
    setMessage('JOJO');
  }, 2000);
  console.log(count);

  useEffect(() => {
    console.log('副作用執行了');
    document.title = count;
    console.log(name);
  }, [ count, name ]);

  useEffect(() => {
    async function loadData() {
      const res = await fetch('http://geek.itheima.net/v1_0/channels').then(res => res.json()).then(data => console.log(data));
      console.log(res);
    }

    loadData();
  }, []);

  useEffect(() => {
    console.log(testRef.current);
    console.log(h1Ref.current);
  }, []);

  function test() {
    setCount(count + 1);
    setFlag(false);
    setList([ 1, 2, 3 ]);
  }

  function Test2() {
    useEffect(() => {
      let timer = setInterval(() => {
        console.log('定時器執行了');
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }, []);
    return (
      <div>test2</div>
    );
  }

  class TestC extends React.Component {
    state = {
      name: "test name",
    };
    getName = () => {
      return 'this is child Test';
    };

    render() {
      return (
        <div>this is TestC class component</div>
      );
    }
  }

  return (
    <HashRouter>
      <Link to="/">首頁</Link>
      <Link to="/about">關於</Link>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Board/>}/>
          <Route path="article" element={<Article/>}/>
        </Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="*" element={<Notfound/>}></Route>
      </Routes>

      <Context.Provider value={count}>
        <hr/>
        <h5>計算屬性</h5>
        {counterStore.filterList.join('-')}
        <button onClick={counterStore.addList}>修改counterStore的陣列</button>
        <hr/>
        {counterStore.count}
        <button onClick={counterStore.addCount}>+++</button>
        <hr/>
        <div className="App" style={{ height: '1200px' }}>
          count:{count}
          <hr/>
          flag:{flag ? 'true' : 'false'}
          <hr/>
          list:{list.join('-')}
          <button onClick={test}>+</button>
          <br/>
          <button onClick={() => {
            setName('cp');
          }}>{name}</button>
          <hr/>
          {y}
          <hr/>
          {message}
          <hr/>
          <Counter count={10}/>
          <Counter count={20}/>
          <Counter/>
          <hr/>
          {flag && <Test2/>}
          <button onClick={() => {
            setFlag(!flag);
          }}>switch
          </button>
          <hr/>
          <TestC ref={testRef}/>
          <h1 ref={h1Ref}>this is h1</h1>
          <hr/>
          <ComA/>
        </div>
      </Context.Provider>
    </HashRouter>
  );
}

export default observer(App);
