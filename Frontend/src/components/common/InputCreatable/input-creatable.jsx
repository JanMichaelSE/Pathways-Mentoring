import { useField } from "formik";
import CreatableSelect from "react-select/creatable";

import styles from "./input-creatable-styles";

function InputCreatable({ initOptions, label, width, isBlue, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const options = initOptions.map((option) => {
    return { value: option, label: option };
  });

  function handleSelectChange(selectValue) {
    setValue(selectValue.value);
  }

  function getDefaultValue() {
    let value = field.value.length > 0 ? field.value : "Select Option";
    return { value: value, label: value };
  }

  function labelStyles() {
    let classNames = "label ";

    if (meta.touched && meta.error) {
      classNames += " label-error";
    }

    if (isBlue) {
      classNames += " blue-font";
    }

    return classNames;
  }

  return (
    <div>
      <label htmlFor={props.id || props.name} className={labelStyles()}>
        {label}
      </label>
      <CreatableSelect
        isDisabled={props.disabled}
        onChange={handleSelectChange}
        defaultValue={getDefaultValue()}
        placeholder="Enter Option"
        styles={{
          ...styles,
          valueContainer: (styles) => ({
            ...styles,
            backgroundColor: "var(--color-white)",
            height: "60px",
            width: width,
            fontSize: "var(--font-size-regular)",
            paddingLeft: "20px",
          }),
        }}
        options={options}
      />
    </div>
  );
}

export default InputCreatable;
