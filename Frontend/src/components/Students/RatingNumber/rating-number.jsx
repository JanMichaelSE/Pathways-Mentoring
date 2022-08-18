import styles from "./rating-number.module.css";

function RatingNumber({ number, activeList, onActiveClick }) {
  function toggleActiveStyles() {
    const isActive = activeList[number - 1];
    return isActive ? styles.buttonActive : "";
  }

  function onButtonClick() {
    onActiveClick(number - 1);
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${toggleActiveStyles()}`}
      onClick={onButtonClick}
    >
      {number}
    </button>
  );
}

export default RatingNumber;
