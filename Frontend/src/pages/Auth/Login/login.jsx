import { useRef,useState,useEffect } from "react";
import styles from  "./login.module.css";
import Pathway_Logo from "@/assets/Pathway_Logo.png"
import loginbackground from "@/assets/login-background.svg"

function Login() {

  const [flag, setFlag] = useState(false);
  const myStyle={
    backgroundImage: `url(${loginbackground})` ,
    position: 'fixed',
    minWidth:'100%',
    minHeight:'100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  const toggleState = () => {
    setFlag((prev) => !prev);
    console.log('Flag:',  flag);
  }


  return (
    <>
    {/* <button onClick={toggleState}>
      Click Me
    </button>
      {
        flag ? "Signup" : "Login"
      }*/}
      <div style={myStyle} className="loginBackground">
        <div>
          <img className={styles.pathwayLogo} src= {Pathway_Logo} alt="Logo" />
        </div>
      </div>
      
    </>
  )
}

export default Login