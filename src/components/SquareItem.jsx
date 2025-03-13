import Button from "./Button";
import styles from "./SquareItem.module.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; // Import Redux action

function SquareItem({ item }) {
  const dispatch = useDispatch(); // ✅ Get dispatch function from Redux
  return (
    <div className={styles.squareContainer}>
      <Button
        onClick={() => dispatch(addToCart(item))}
        className={styles.square}
        type={"squareitem"}
      >
        {item.name}
      </Button>
    </div>
  );
}

export default SquareItem;
