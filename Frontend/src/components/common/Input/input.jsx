import { useField, ErrorMessage } from "formik";
import { phoneFormat } from "@/utils/helpers";
import styles from "./input.module.css";

function Input({ label, imgUrl, isBlue, ...props }) {
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
    let classNames = styles.label;

    if (meta.touched && meta.error) {
      classNames += " label-error";
    }
    if (isBlue) {
      classNames += " " + styles.blueFont;
    }
    return classNames;
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
        <label className={labelStyles()} htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <input
        autoComplete="off"
        className={inputStyles()}
        style={{
          width: props.width,
          height: props.height,
          backgroundImage: `url(${imgUrl})`,
        }}
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
