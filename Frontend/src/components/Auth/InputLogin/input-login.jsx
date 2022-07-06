import { useField } from "formik";
import styles from "./input-login.module.css";

function InputLogin({...props }) {
  const [field, meta] = useField(props);

  function inputStyles() {
    return meta.touched && meta.error
      ? `${styles.input} input-error`
      : styles.input;
  }

  return (
    <div>
      <input className={inputStyles()} style={{width: props.width}} {...field} {...props} />
    </div>
  );
}

export default InputLogin;