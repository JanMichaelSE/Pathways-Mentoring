import styles from "./input-text.module.css";

function InputText({label, placeholder, required}) {

  if (required) {
    label = label + ' *';
  }

  return (
    <div>
      <label className={styles.label} htmlFor="">
        {label}
      </label>
      <input className={styles.input} name="" type="text" placeholder={placeholder} required={required} />
    </div>
  );
}

export default InputText;
