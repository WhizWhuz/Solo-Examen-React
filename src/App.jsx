import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTenant } from "./redux/tenantSlice";
import { fetchApiKey } from "./redux/cartSlice";
import "./App.css";
import Menu from "../src/pages/Menu/Menu";
import Eta from "../src/pages/Eta/Eta";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.scss";

function App() {
  const dispatch = useDispatch();
  const apiKey = useSelector((state) => state.cart.apiKey); // ✅ Get API key from Redux
  const apiStatus = useSelector((state) => state.cart.status);
  const apiKeyStatus = useSelector((state) => state.cart.status);

  const [cartOpen, setCartOpen] = useState(false);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    dispatch(fetchApiKey());
  }, [dispatch]);

  useEffect(() => {
    if (apiKey) {
      dispatch(fetchTenant());
    }
  }, [apiKey, dispatch]);

  useEffect(() => {
    if (apiKey) {
      fetch("https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-zocom": apiKey,
        },
      })
        .then((response) => response.json())
        .then((data) => setMenu(data.items || []))
        .catch((error) => console.error("Menu fetch error:", error));
    }
  }, [apiKey]);

  const apiKeyLoaded = apiKey && apiStatus === "succeeded";

  const categorizedMenu = menu.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Menu
              setCartOpen={setCartOpen}
              cartOpen={cartOpen}
              menu={menu}
              categorizedMenu={categorizedMenu}
            />
          }
        />
        <Route
          path="eta"
          element={<Eta cartOpen={cartOpen} setCartOpen={setCartOpen} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
