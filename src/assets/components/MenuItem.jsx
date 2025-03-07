import styles from "./MenuItem.module.scss";

function MenuItem() {
  return (
    <div className={styles.menu}>
      <span className={styles.item}>
        <h2>Karlstad </h2> <h2>9 SEK</h2>
      </span>
      <p className={styles.desc}>kantarell, scharlottenlök, morot, bladpersilja</p>
    </div>
  );
}

export default MenuItem;
