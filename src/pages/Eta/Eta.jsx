import styles from "./Eta.module.scss";
import Header from "../../components/Header";
import Cardbox from "../../assets/images/png/cardboardbox.png";
import Button from "../../components/Button";
import MenuItem from "../../components/MenuItem";
import TinyLogo from "../../assets/images/svg/logocolor.svg";
import CartItem from "../../components/CartItem";

function Eta({ setCartOpen, cartOpen }) {
  return (
    <>
      <div className={styles.etaPage}>
        <Header cartclass={"hidden"} />
        {cartOpen && (
          <div className={styles.billPage}>
            <Header cartclass={"hidden"} />
            <div className={styles.billContainer}>
              <img src={TinyLogo} alt="" />
              <h3>#4kjwsdf234k</h3>
              <span className={styles.billWrapper}>
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
              </span>
              <div className={styles.billTotal}>
                <div className={styles.totalContainer}>
                  <span>
                    <h4>Total</h4>
                    <p>inkl 20% moms</p>
                  </span>
                  <h5>101 SEK</h5>
                </div>
              </div>
            </div>
            <Button
              color={"#353131"}
              textcolor={"rgba(244, 243, 241, 0.94)"}
              type={"marginFat"}
            >
              gör en ny beställning
            </Button>
          </div>
        )}
        <img style={{ marginTop: "2rem" }} src={Cardbox} alt="" />
        <div className={styles.etaContainer}>
          <span className={styles.etaHeader}>
            <h1>DINA WONTONS TILLAGAS!</h1>
            <h2>Eta 2 min</h2>
            <h3>#4kjwsdf234k</h3>
          </span>
          <div className={styles.buttons}>
            <Button
              color={"#353131"}
              textcolor={"rgba(244, 243, 241, 0.94)"}
              type={"rect"}
            >
              gör en ny beställning
            </Button>
            <Button
              color={"none"}
              textcolor={"rgba(244, 243, 241, 0.94)"}
              type={"hollow"}
              onClick={() => setCartOpen((is) => !is)}
            >
              Se Kvitto
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Eta;
