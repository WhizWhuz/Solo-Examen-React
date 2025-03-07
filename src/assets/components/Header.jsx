import styles from "./Header.module.scss";
import Button from "./Button";
import Logo from "../../assets/images/svg/logohollow.svg";
import Cart from "../../assets/images/svg/cart.svg";

function Header() {
  return (
    <div className={styles.navBar}>
      <img src={Logo} alt="" />
      <Button type={"square"}>
        <img src={Cart} alt="" />
      </Button>
    </div>
  );
}

export default Header;
