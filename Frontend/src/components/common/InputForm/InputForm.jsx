import { useField, ErrorMessage } from "formik";
import styles from "./InputForm.module.css";
import { phoneFormat } from "@/utils/helpers";

function InputForm({ label, imgUrl, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  function inputStyles() {
    let classNames = styles.input;

    if (meta.touched && meta.error) {
      classNames += " input-error";
    }
    if (imgUrl) {
      classNames += " " + styles.inputImg;
    }

    return classNames;
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
      {label && (
        <label className={labelStyles()} style={{textAlign: "left", color: "#0066cc"}} htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <input
        className={inputStyles()}
        style={{ width: props.width, backgroundImage: `url(${imgUrl})` }}
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

export default InputForm;
