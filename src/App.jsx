import { useState, useEffect } from "react";
import Menu from "./pages/Menu/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Eta from "./pages/Eta/Eta";

function App() {
  // Tenant ID
  const tId = "f3o7";
  const [tenantId, setTenantId] = useState(
    localStorage.getItem("tenantId") || tId
  );

  // API Menu & ETA States

  const [apiKey, setApiKey] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [menu, setMenu] = useState([]);

  const [orderStatus, setOrderStatus] = useState("idle");
  const [eta, setEta] = useState(null);

  // Loading State

  const [loading, setLoading] = useState(true);

  // Fetch Key useEffect

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch(
          "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) throw new Error("Gick inte hämta nyckeln");
        const data = await response.json();
        console.log(data.key);
        console.log(tenantId);
        setApiKey(data.key);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApiKey();
  }, [tenantId]);

  // Fetch Menu IF Key & Tenant ID

  useEffect(() => {
    if (!apiKey || !tenantId) return;

    const fetchMenu = async () => {
      try {
        const response = await fetch(
          "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-zocom": apiKey,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch menu");
        const menuData = await response.json();
        setMenu(menuData.items);
        console.log(menuData.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, [apiKey, tenantId]);

  // Categorized menu - breaks down Menu after "Type"

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
              categorizedMenu={categorizedMenu}
              apiKey={apiKey}
              tenantId={tenantId}
              eta={eta}
              setEta={setEta}
              orderStatus={orderStatus}
              setOrderStatus={setOrderStatus}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="eta"
          element={
            <Eta eta={eta} cartOpen={cartOpen} setCartOpen={setCartOpen} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
