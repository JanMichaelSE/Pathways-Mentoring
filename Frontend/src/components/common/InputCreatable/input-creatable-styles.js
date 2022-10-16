// Styles are in javascript because of how the React-Select
// Library allows to style its components

const customSelectStyles = {
  control: (styles) => ({
    ...styles,
    textAlign: "left",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "30px",
    resize: "none",
    overflow: "hidden",
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    backgroundColor: "var(--color-white)",
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
  placeholder: (styles) => ({
    ...styles,
    opacity: "0.6",
  }),
};

export default customSelectStyles;
