import { useField, ErrorMessage } from "formik";
import styles from "./input.module.css";
import { phoneFormat } from "@/utils/helpers";

function Input({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

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

  function formatInput(event) {
    const value = event.target.value;

    if (props.type === "tel") {
      return setValue(phoneFormat(value));
    }

    setValue(value);
  }

  return (
    <div>
      <label className={labelStyles()} htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className={inputStyles()}
        style={{ width: props.width }}
        {...field}
        {...props}
        onChange={formatInput}
      />
      <span className={`error ${styles.errorContainer}`}>
        <ErrorMessage name={props.name} />
      </span>
    </div>
  );
}

export default Input;
