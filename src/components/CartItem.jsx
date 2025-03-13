import styles from "./CartItem.module.scss";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice"; // Import Redux action
import Minus from "../assets/images/svg/minus.svg";
import Plus from "../assets/images/svg/plus.svg";

function CartItem({ cartItem }) {
  const dispatch = useDispatch();
  return (
    <div className={styles.cartItem}>
      <li>
        <span className={styles.item}>
          <h2 className={styles.name}>{cartItem.name}</h2>
          <span className={styles.dots}></span>
          <h2>{cartItem.price * cartItem.quantity} KR</h2>
        </span>
        <span className={styles.desc}>
          <p>{cartItem.quantity}x</p>
          <div onClick={() => dispatch(addToCart(cartItem))}>
            {" "}
            <img src={Plus} alt="" />{" "}
          </div>
          <div onClick={() => dispatch(removeFromCart(cartItem.id))}>
            <img src={Minus} alt="" />
          </div>
        </span>
      </li>
    </div>
  );
}

export default CartItem;
