import { useSearchParams, useParams } from "react-router-dom";

function About() {
  // const [ params ] = useSearchParams();
  const params = useParams();

  // const id = params.get('id');
  // const name = params.get('name');

  const { id } = params;
  return (<div>About,得到的參數, id：{id}</div>);
}

export default About;
