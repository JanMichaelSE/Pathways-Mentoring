import { Field, useField, ErrorMessage } from "formik";
import styles from "./InputMessage.module.css";
import { useState } from "react";

function InputMessage({ label, bottomCount, countNumber, isBlue, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const [count, setCount] = useState(countNumber);

  function inputStyles() {
    let classNames = styles.input;

    if (meta.touched && meta.error) {
      classNames += " input-error";
    }

    return classNames;
  }

  function labelStyles() {
    let classNames = styles.label;

    if (meta.touched && meta.error) {
      classNames += " label-error";
    }
    if (isBlue) {
      classNames += " " + styles.blueFont;
    }
    return classNames;
  }

  function setterCountInput(event) {
    const value = event.target.value;
    setCount(value.length);
    setValue(value);
  }

  return (
    <div>
      {label && (
        <label className={labelStyles()} htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <Field
        as="textarea"
        className={inputStyles()}
        style={{ width: props.width }}
        {...field}
        {...props}
        onChange={setterCountInput}
      />
      <span className={`error ${styles.errorContainer}`}>
        <ErrorMessage name={props.name} />
      </span>
      {bottomCount && (
        <p className={styles.inputCount}>{1500 - count} characters left</p>
      )}
    </div>
  );
}

export default InputMessage;
