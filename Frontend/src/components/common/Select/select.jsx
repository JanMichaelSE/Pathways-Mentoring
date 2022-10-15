import { useField, ErrorMessage } from "formik";
import styles from "./select.module.css";

function Select({ label, isBlue, ...props }) {
  const [field, meta] = useField(props);

  function selectStyles() {
    return meta.touched && meta.error ? `${styles.select} input-error` : styles.select;
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

  return (
    <div>
      <label htmlFor={props.id || props.name} className={labelStyles()}>
        {label}
      </label>
      <select className={selectStyles()} {...field} {...props} />
      <span className={`error ${styles.errorContainer}`}>
        <ErrorMessage name={props.name} />
      </span>
    </div>
  );
}

export default Select;
