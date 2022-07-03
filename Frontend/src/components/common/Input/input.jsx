import { useField } from "formik";
import styles from "./input.module.css";

function Input({ label, ...props }) {
  const [field, meta] = useField(props);

  function inputStyles() {
    return meta.touched && meta.error
      ? `${styles.input} input-error`
      : styles.input;
  }

  function labelStyles() {
    return meta.touched && meta.error
      ? `${styles.label} label-error`
      : styles.label;
  }

  return (
    <div>
      <label className={labelStyles()} htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className={inputStyles()} style={{width: props.width}} {...field} {...props} />
    </div>
  );
}

export default Input;
