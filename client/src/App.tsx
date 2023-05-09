import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Law from "./pages/Law";

function App() {
  const [mini, setMini] = useState(false);
  const bodyClass = () => {
    const isTop = true;
    let result = "";
    if (mini) result += mini ? " mini" : " full";
    if (isTop) result += isTop ? " top" : "";
    return result;
  };
  return (
    <div className={`App${bodyClass()}`}>
      <BrowserRouter>
        <Header type="top" />
        {/* <Header type="side" minimization={setMini} /> */}
        <Routes>
          <Route path="/law" element={<Law />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
