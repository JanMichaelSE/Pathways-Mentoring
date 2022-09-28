import styles from "./student-record-view.module.css";
import { useLocation } from "react-router-dom";

function RecordView() {
  const { state } = useLocation();

  return <div className={styles.container}>Individual Record</div>;
}

export default RecordView;
