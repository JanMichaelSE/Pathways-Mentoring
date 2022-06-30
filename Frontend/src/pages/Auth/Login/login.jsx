import { useRef,useState,useEffect } from "react";
import styles from  "./login.module.css";
import Pathway_Logo from "@/assets/Pathway_Logo.png"
import { Link } from "react-router-dom";
import loginbackground from "@/assets/login-background.svg"

function Login() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user,pwd])

  const [flag, setFlag] = useState(false);
  
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
      <div className={styles.loginBackground}>
        <div className={styles.logoContainer}>
          <img className={styles.pathwayLogo} src= {Pathway_Logo} alt="Logo" />
        </div>
        <div className={styles.formContainer}>
          <form>
                <input
                      className={styles.inputUser}
                      type="text"
                      id="username"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      required
                      placeholder="Email"
                />
                <input
                      className={styles.inputPwd}
                      type="password"
                      id="password"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      required
                      placeholder="Password"
                />
                <button className={styles.button}>Log In</button>
          </form>
        </div>
        <div className={styles.linkContainer}>
          <h2 className={styles.subHeading}>
              New to Pathways?{" "}
              <Link to={"/"} className={styles.navigationLink}>
                Create an account.
              </Link><br />
           </h2>
           <h2  className={styles.subHeading}>
              <Link to={"/"} className={styles.navigationLink}>
                Forgot password?
              </Link><br />
            </h2>
        </div>
      </div>
    </>
  )
}

export default Login