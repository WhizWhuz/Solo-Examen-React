import styles from "./Header.module.scss";
import Button from "./Button";
import Logo from "../assets/images/svg/logohollow.svg";
import CartLogo from "../assets/images/svg/cart.svg";
import { useNavigate } from "react-router-dom";

function Header({ setCartOpen, logoclass, cartclass }) {
  let navigate = useNavigate();
  return (
    <div className={styles.navBar}>
      <img
        className={styles[`${logoclass}`]}
        src={Logo}
        alt=""
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className={styles[`${cartclass}`]}>
        <Button onClick={() => setCartOpen((is) => !is)} type={"square"}>
          <img src={CartLogo} alt="" />
        </Button>
      </div>
    </div>
  );
}

export default Header;
