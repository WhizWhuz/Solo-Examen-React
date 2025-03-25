import styles from "./EtaItem.module.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; // Import Redux action

function EtaItem({ item }) {
  const dispatch = useDispatch(); // ✅ Get dispatch function from Redux

  return (
    <div className={styles.menu} onClick={() => dispatch(addToCart(item))}>
      <li>
        <span
          className={styles.item}
          style={{
            marginBottom: "0.5rem",
          }}
        >
          <h2>{item.name}</h2>
          <span className={styles.dots}></span> <h2>{item.price} KR</h2>
        </span>
        <p className={styles.desc}></p>
      </li>
    </div>
  );
}

export default EtaItem;
