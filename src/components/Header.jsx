import styles from "./Header.module.scss";
import Button from "./Button";
import Logo from "../assets/images/svg/logohollow.svg";
import CartLogo from "../assets/images/svg/cart.svg";

function Header({ setCartOpen, logoclass, cartclass, cart }) {
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className={styles.navBar}>
      <img className={styles[`${logoclass}`]} src={Logo} alt="" />
      <div className={styles[`${cartclass}`]}>
        <div className={styles.cartBadge}>{totalCartItems}</div>
        <Button onClick={() => setCartOpen((is) => !is)} type={"square"}>
          <img src={CartLogo} alt="" />
        </Button>
      </div>
    </div>
  );
}

export default Header;
