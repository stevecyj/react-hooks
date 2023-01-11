import { useState } from "react";
import './App.css';

function App() {
  const [ count, setCount ] = useState(0);
  const [ flag, setFlag ] = useState(true);
  const [ list, setList ] = useState([]);
  console.log(count);

  function test() {
    setCount(count + 1);
    setFlag(false);
    setList([ 1, 2, 3 ]);
  }

  return (
    <div className="App">
      count:{count}
      <hr/>
      flag:{flag ? 'true' : 'false'}
      <hr/>
      list:{list.join('-')}
      <button onClick={test}>+</button>
    </div>
  );
}

export default App;
