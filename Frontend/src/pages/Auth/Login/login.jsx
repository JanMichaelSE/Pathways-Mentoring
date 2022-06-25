import { useState } from "react";
import styles from  "./login.module.css";

function Login() {

  const [flag, setFlag] = useState(false);

  const toggleState = () => {
    setFlag((prev) => !prev);
    console.log('Flag:',  flag);
  }


  return (
    <>
    <button onClick={toggleState}>
      Click Me
    </button>
      {
        flag ? "Signup" : "Login"
      }
    </>
  )
}

export default Login