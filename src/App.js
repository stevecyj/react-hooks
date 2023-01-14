import { useEffect, useState } from "react";
import { useWindiwScroll } from "./hooks/useWindiwScroll.js";
import { useLocalStorage } from "./hooks/useLocalStorage";
import './App.css';

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

function App() {
  const [ count, setCount ] = useState(0);
  const [ name, setName ] = useState('zs');
  const [ flag, setFlag ] = useState(true);
  const [ list, setList ] = useState([]);
  const [ y ] = useWindiwScroll();
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

  return (
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
    </div>
  );
}

export default App;
