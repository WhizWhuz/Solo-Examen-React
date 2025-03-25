import styles from "./Eta.module.scss";
import Header from "../../components/Header";
import Cardbox from "../../assets/images/png/cardboardbox.png";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem";
import { useEffect, useState } from "react";
import EtaItem from "../../components/EtaItem";

function Eta({ eta, setCartOpen, cartOpen }) {
  let navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.order;
  console.log("ETA received on ETA page:", eta);

  const [minutesRemaining, setMinutesRemaining] = useState(null);

  useEffect(() => {
    if (orderData?.eta) {
      const etaTime = new Date(orderData.eta);
      const now = new Date();

      const diffInMinutes = Math.round((etaTime - now) / 60000);

      setMinutesRemaining(diffInMinutes);
    }
  }, [orderData]);

  return (
    <div className={styles.etaPage}>
      <Header
        cartclass={"hidden"}
        onClick={() => {
          navigate("/");
        }}
      />
      {cartOpen && (
        <div
          className={styles.billPage}
          onClick={() => setCartOpen((is) => !is)}
        >
          <Header cartclass={"hidden"} />
          <div className={styles.billContainer}>
            <h3>
              {orderData?.id ? `#${orderData.id}` : "❌ No Order ID found."}
            </h3>
            <span className={styles.billWrapper}>
              {orderData.items?.map((orderItem) => (
                <EtaItem key={orderItem.id} item={orderItem} />
              ))}
            </span>
            <div className={styles.billTotal}>
              <div className={styles.totalContainer}>
                <span>
                  <h4>Total</h4>
                  <p>inkl 20% moms</p>
                </span>
                <h5>{orderData.orderValue} SEK</h5>
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
      <img style={{ marginTop: "2rem" }} src={Cardbox} alt="Order Box" />
      <div className={styles.etaContainer}>
        <span className={styles.etaHeader}>
          <h1>DINA WONTONS TILLAGAS!</h1>
          <h2>
            {minutesRemaining !== null
              ? `${minutesRemaining} min`
              : "❌ Ingen ETA."}
          </h2>
          <h3>
            {orderData?.id ? `#${orderData.id}` : "❌ Hittar ingen Order ID."}
          </h3>
        </span>
        <div className={styles.buttons}>
          <Button
            color={"#353131"}
            textcolor={"rgba(244, 243, 241, 0.94)"}
            type={"rect"}
            onClick={() => navigate("/")}
          >
            Gör en ny beställning
          </Button>
          <Button
            onClick={() => setCartOpen((is) => !is)}
            textcolor={"rgba(244, 243, 241, 0.94)"}
            type={"hollow"}
          >
            Kvitto
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Eta;
