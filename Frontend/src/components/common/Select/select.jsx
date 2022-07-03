import { useField } from "formik";
import styles from "./select.module.css";

function Select({ label, ...props }) {
  const [field, meta] = useField(props);

  function selectStyles() {
    return meta.touched && meta.error
      ? `${styles.select} input-error`
      : styles.select;
  }

  function labelStyles() {
    return meta.touched && meta.error
      ? `${styles.label} label-error`
      : styles.label;
  }

  return (
    <div>
      <label htmlFor={props.id || props.name} className={labelStyles()}>
        {label}
      </label>
      <select className={selectStyles()} {...field} {...props} />
    </div>
  );
}

export default Select;
