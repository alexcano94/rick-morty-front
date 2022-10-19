import styles from "./styles.module.css";

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <span>44</span>
      </div>
      <p>
        The page you are trying to search has been moved to another universe.
      </p>
    </div>
  );
};

export default NotFound;
