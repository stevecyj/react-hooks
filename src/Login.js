import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function goAbout() {
    navigate('/about?id=1001&name=JOJO', { replace: true });
  }

  return (
    <div>
      Login
      <button onClick={goAbout}>跳到關於</button>
    </div>
  );
}

export default Login;