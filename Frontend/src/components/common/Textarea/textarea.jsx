import { useField, ErrorMessage } from "formik";
import styles from "./textarea.module.css";

function Textarea({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  function textareaStyles() {
    let classNames = styles.textarea;

    if (meta.touched && meta.error) {
      classNames += " textarea-error";
    }

    return classNames;
  }

  function handleChange(event) {
    const value = event.target.value;

    setValue(value);
  }

  return (
    <div>
      <textarea
        className={textareaStyles()}
        {...field}
        {...props}
        onChange={handleChange}
      />
      <span className={`error ${styles.errorContainer}`}>
        <ErrorMessage name={props.name} />
      </span>
    </div>
  );
}

export default Textarea;
