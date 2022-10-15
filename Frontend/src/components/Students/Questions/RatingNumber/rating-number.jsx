import styles from "./rating-number.module.css";

function RatingNumber({ number, activeList, onActiveClick }) {
  function toggleActiveStyles() {
    const isActive = activeList[number - 1];
    return isActive ? styles.buttonActive : "";
  }

  function onButtonClick() {
    onActiveClick(number - 1);
  }

  function getRatingText() {
    if (number === "5") {
      return <p className={styles.ratingText}>Very High</p>;
    } else if (number === "1") {
      return <p className={styles.ratingText}>Very Low</p>;
    } else {
      return "";
    }
  }

  return (
    <div>
      <button
        type="button"
        className={`${styles.button} ${toggleActiveStyles()}`}
        onClick={onButtonClick}
      >
        {number}
      </button>
      {getRatingText()}
    </div>
  );
}

export default RatingNumber;
