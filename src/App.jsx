import { useState } from "react";
import "./App.css";
import Menu from "../src/pages/Menu/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="meny" element={<Menu />} />
        {/* <Route path="order" element={<Order />} />
        <Route path="status" element={<Status />} />
        <Route path="receipt" element={<Receipt />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
