import Button from "./Button";
import styles from "./SquareItem.module.scss";

function DrinkList({ item }) {
  return (
    <div className={styles.squareContainer}>
      <Button className={styles.square} type={"squareitem"}>
        {item.name}
      </Button>
    </div>
  );
}

export default DrinkList;
