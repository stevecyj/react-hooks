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

  function test() {
    setCount(count + 1);
    setFlag(false);
    setList([ 1, 2, 3 ]);
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
    </div>
  );
}

export default App;
