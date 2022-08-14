// Styles are in javascript because of how the React-Select
// Library allows to style its components

const customSelectStyles = {
  control: (styles) => ({
    ...styles,
    boxShadow: "0 0 1px var(--color-grey)",
    borderRadius: "10px",
    resize: "none",
  }),
  valueContainer: (styles) => ({
    ...styles,
    textAlign: "left",
    backgroundColor: "#e0e6ea80",
    height: "5rem",
    width: "100%",
    fontSize: "var(--font-size-regular)",
    paddingLeft: "20px",
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    backgroundColor: "#e0e6ea80",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display: "none",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    transform: "scale(3)",
    padding: "0",
    paddingRight: "1rem",
  }),
  clearIndicator: (styles) => ({
    ...styles,
    transform: "scale(2)",
    paddingRight: "2rem",
    color: "red",
    cursor: "pointer",
  }),
  menuList: (styles) => ({
    ...styles,
    textAlign: "left",
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "white",
  }),
  placeholder: (styles) => ({
    ...styles,
    opacity: "0.6",
  }),
};

export default customSelectStyles;
