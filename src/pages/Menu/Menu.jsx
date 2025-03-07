import styles from "./Menu.module.scss";
import MenuItem from "../../assets/components/MenuItem";
import Header from "../../assets/components/Header";

function Menu() {
  return (
    <>
      <div className={styles.menuPage}>
        <Header />
        <div className={styles.menuMenu}>
          <h1 className={styles.menuHeader}>Meny</h1>
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>
      </div>
    </>
  );
}

export default Menu;
