import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../../redux/cartSlice";
import styles from "./Menu.module.scss";
import MenuItem from "../../components/MenuItem";
import SquareItem from "../../components/SquareItem";
import Header from "../../components/Header";
import Button from "../../components/Button";
import CartItem from "../../components/CartItem";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

function Menu({
  cartOpen,
  setCartOpen,
  categorizedMenu,
  apiKey,
  tenantId,
  setEta,
  orderStatus,
  setOrderStatus,
  loading,
  setLoading,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.items);
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSendOrder = async () => {
    if (!tenantId || !apiKey) {
      console.error("Tenant ID or API Key is missing!");
      return;
    }


    try {
      const response = await fetch(
        `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${tenantId}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-zocom": apiKey,
          },
          body: JSON.stringify({ items: cart.map((item) => item.id) }),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Order failed: ${errorDetails}`);
      }

      const data = await response.json();
      console.log("✅ Order data:", data);

      if (data.order && data.order.eta) {
        setEta(data.order.eta);
        setCartOpen(false);
        dispatch(clearCart());

        navigate("/eta", { state: { order: data.order } });
      } else {
        throw new Error("Ingen ETA från API.");
      }
    } catch (error) {
      setOrderStatus("failed");
      console.error("❌ Order Error:", error);
    }
  };

  return (
    <>
      {/* Cart Modal */}
      {cartOpen && (
        <div className={styles.cartPage}>
          <Header
            cart={cart}
            logoclass={"hidden"}
            setCartOpen={setCartOpen}
            cartOpen={cartOpen}
          />
          <div className={styles.cartBadge}>{totalCartItems}</div>
          <span className={styles.cartContainer}>
            <h1 className={styles.cartHeader}>Din Varukorg</h1>
            <div className={styles.cartHolder}>
              {cart.map((cartItem) => (
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem}
                  totalPrice={totalPrice}
                  add={() => dispatch(addToCart(cartItem))}
                  remove={() => dispatch(removeFromCart(cartItem.id))}
                />
              ))}
            </div>
            <div className={styles.sep}></div>
            <span className={styles.cartCart}>
              <div className={styles.totalMoney}>
                <span>Totalt</span>
                <span style={{ fontSize: "32px" }}>{totalPrice} SEK</span>
              </div>
              <Button
                color={"#353131"}
                textcolor={"#fff"}
                type={"rectanglebig"}
                onClick={handleSendOrder}
              >
                {orderStatus === "loading"
                  ? "Skickar order..."
                  : "Take my Money!"}
              </Button>

              {orderStatus === "succeeded" && (
                <p style={{ position: "absolute", bottom: "25%" }}>
                  ✅ Order gick igenom!
                </p>
              )}
              {orderStatus === "failed" && (
                <p
                  style={{
                    position: "absolute",
                    fontSize: "20px",
                    bottom: "25%",
                  }}
                >
                  ❌ Något blev fel. Försök igen.
                </p>
              )}
            </span>
          </span>
        </div>
      )}

      {/* Menu Page */}
      <div className={styles.menuPage}>
        <Header setCartOpen={setCartOpen} cartOpen={cartOpen} cart={cart} />
        <div className={styles.cartBadge}>{totalCartItems}</div>
        <div className={styles.menuMenu}>
          <h1 className={styles.menuHeader}>Meny</h1>

          {/* IF Loading: Spinner else Menu Container */}
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className={styles.menuContainer}>
                <ul>
                  {categorizedMenu.wonton?.map((menuItem, index) => (
                    <MenuItem
                      key={menuItem.id}
                      item={menuItem}
                      addToCart={() => dispatch(addToCart(menuItem))}
                      style={{ "--delay": `${index * 0.1}s` }}
                    />
                  ))}
                </ul>
              </div>

              <div className={styles.squareHeader}>
                <span className={styles.dip}>
                  <h2>Dipsåser</h2>
                  <div className={styles.dots}></div>
                  <h2>19 KR</h2>
                </span>
              </div>
              <div className={styles.squareContainer}>
                {categorizedMenu.dip?.map((menuItem, index) => (
                  <SquareItem
                    key={menuItem.id}
                    item={menuItem}
                    addToCart={() => dispatch(addToCart(menuItem))}
                    style={{ "--delay": `${index * 0.1}s` }}
                  />
                ))}
              </div>

              <div className={styles.squareHeader}>
                <span className={styles.dip}>
                  <h2>Drycker</h2>
                  <div className={styles.dots}></div>
                  <h2>19 KR</h2>
                </span>
              </div>
              <div className={styles.squareContainer}>
                {categorizedMenu.drink?.map((menuItem, index) => (
                  <SquareItem
                    key={menuItem.id}
                    item={menuItem}
                    addToCart={() => dispatch(addToCart(menuItem))}
                    style={{ "--delay": `${index * 0.1}s` }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Menu;
