import styles from "./no-items-found.module.css";

function NoItemsFound({ title, icon }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img className={styles.image} src={icon} alt="" />
        <h1 className={styles.title}>{title}</h1>
      </div>
    </div>
  );
}

export default NoItemsFound;
