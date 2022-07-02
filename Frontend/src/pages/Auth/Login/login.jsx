import { useRef,useState,useEffect } from "react";
import styles from  "./login.module.css";
import Pathway_Logo from "@/assets/Pathway_Logo.png"
import { Link } from "react-router-dom";


function Login() {

  const initialValues = { email: "", password: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [ isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value});
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.email){
      errors.email = "Email is required!";
    }else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if(!values.password) {
      errors.password = "Password is required!";
    }else if (values.password.length < 12){
      errors.password = "Password most be more than 8 characters";
    }
    return errors;
  };

 /* const userRef = useRef();
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
  }, [user,pwd])*/

  //const [flag, setFlag] = useState(false);

  //const toggleState = () => {
  //  setFlag((prev) => !prev);
  //  console.log('Flag:',  flag);
  //}


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
          {/*{Object.keys(formErrors).length === 0 && isSubmit ? (<div className="ui message success">Signed successfully</div>
          ) : (
          <pre>{JSON.stringify(formValues,undefined,2)}</pre>
          )}*/}
          <form onSubmit={handleSubmit}>
                <input
                      className={styles.inputUser}
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      onChange={handleChange} /*{(e) => setUser(e.target.value)}*/
                      value={formValues.email}
                      placeholder="Email"
                />
                <p>{ formErrors.email}</p>
                <input
                      className={styles.inputPwd}
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleChange} /*{(e) => setPwd(e.target.value)}*/
                      value={formValues.password}
                      placeholder="Password"
                />
                <p>{ formErrors.password}</p>
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