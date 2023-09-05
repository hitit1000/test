import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Law from "./pages/Law";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Overview from "./pages/Overview";
import Projectmanagement from "./pages/Projectmanagement";
import AuthLayout from "./components/AuthLayout";

// useHistory
function App() {
  const [mini, setMini] = useState(false);
  const bodyClass = () => {
    const isTop = true;
    let result = "";
    // if (mini) result += mini ? " mini" : " full";
    // if (isTop) result += isTop ? " top" : "";
    return result;
  };
  return (
    <div className={`App${bodyClass()}`}>
      {/* <BrowserRouter> */}
      {/* <Header type="side" minimization={setMini} /> */}
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route element={<AuthLayout />}>
          <Route path="/architeco" element={<Overview />} />
          <Route path="/law" element={<Law />} />
          <Route path="/project" element={<Projectmanagement />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
