import { useSearchParams } from "react-router-dom";

function About() {
  const [ params ] = useSearchParams();
  const id = params.get('id');
  const name = params.get('name');
  return (<div>About,得到的參數 id：{id},name：{name}</div>);
}

export default About;
