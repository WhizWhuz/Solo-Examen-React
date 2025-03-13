import styles from "./Menu.module.scss";
import MenuItem from "../../components/MenuItem";
import Header from "../../components/Header";
import Button from "../../components/Button";
import SquareItem from "../../components/SquareItem";
import CartItem from "../../components/CartItem";
import Spinner from "../../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, fetchApiKey, sendOrder } from "../../redux/cartSlice";
import { useState, useEffect } from "react";
import { fetchTenant } from "../../redux/tenantSlice"; // ✅ Fetch tenant when app starts

function Menu({ cartOpen, setCartOpen, categorizedMenu }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(true);
  const tenantId = useSelector((state) => state.tenant.tenantId);
  const orderStatus = useSelector((state) => state.cart.status);

  const tenantStatus = useSelector((state) => state.tenant.status);
  // const eta = useSelector((state) => state.cart.eta);

  useEffect(() => {
    dispatch(fetchApiKey()); // ✅ Fetch API key when app starts
  }, [dispatch]);

  useEffect(() => {
    console.log("Tenant ID:", tenantId, "Tenant Status:", tenantStatus);
  }, [tenantId, tenantStatus]);

  useEffect(() => {
    dispatch(fetchTenant()); // ✅ Fetch tenant on app start
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {cartOpen && (
        <div className={styles.cartPage}>
          <Header
            cart={cart}
            logoclass={"hidden"}
            setCartOpen={setCartOpen}
            cartOpen={cartOpen}
          />
          <span className={styles.cartContainer}>
            <h1 className={styles.cartHeader}>Din Varukorg</h1>
            <div className={styles.cartHolder}>
              {cart.map((cartItem) => (
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem}
                  totalPrice={totalPrice}
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
                onClick={() => {
                  if (tenantId) {
                    dispatch(sendOrder({ tenantId, cartItems: cart }));
                  } else {
                    console.error("Tenant ID is missing!");
                  }
                }}
              >
                {orderStatus === "loading"
                  ? "Placing Order..."
                  : "Take my Money!"}
              </Button>
            </span>
          </span>
        </div>
      )}
      <div className={styles.menuPage}>
        <Header setCartOpen={setCartOpen} cartOpen={cartOpen} cart={cart} />
        <div className={styles.menuMenu}>
          <h1 className={styles.menuHeader}>Meny</h1>

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
                    style={{ "--delay": `${index * 0.1}s` }}
                    addToCart={() => dispatch(addToCart(menuItem))}
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
