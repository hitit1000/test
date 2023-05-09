import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";

type propsType = { type: string; minimization?: any };

const Header = ({ type, minimization }: propsType) => {
  const [hidden, setHidden] = useState(false);
  const [expand, setExpand] = useState("");
  const clickHidden = () => {
    setHidden(!hidden);
    minimization(!hidden);
  };
  const clickExpand = (e: any) => {
    let value = "";
    if (expand !== e.currentTarget.id) value = e.currentTarget.id;
    setExpand(value);
  };
  const menuList = [
    {
      main: "Home",
      address: "#1",
      subType: "dropdown_hover",
      sub: [
        { item: "GEO ESG", address: "/" },
        { item: "Architeco Group", address: "/architeco" },
      ],
    },
    {
      main: "ESG Process",
      address: "#2",
      subType: "dropdown_hover",
      sub: [
        { item: "ESG Process", address: "/#section3" },
        { item: "ESG Academy", address: "/#section4" },
        { item: "ESG Partnership", address: "/#section5" },
      ],
    },
    {
      main: "Solution",
      address: "#3",
      subType: "dropdown_hover",
      sub: [
        { item: "Law", address: "/law" },
        { item: "EPD Store", address: "#5-2" },
        { item: "Zero Energy", address: "#5-3" },
        { item: "RE100", address: "#5-4" },
        { item: "Academy", address: "#5-5" },
        { item: "Dashboard", address: "#5-6" },
      ],
    },
    { main: "Contact Us", address: "#4" },
  ];
  const staticList = [
    { main: "home", address: "/", img: "imgs/home.svg" },
    { main: "search", address: "/search", img: "imgs/search.svg" },
    { main: "forest", address: "/forest", img: "imgs/forest.svg" },
    { main: "leaf", address: "/leaf", img: "imgs/nest_eco_leaf.svg" },
    {
      main: "bolt",
      address: "#",
      img: "imgs/bolt.svg",
      subType: "expand",
      sub: [
        { item: "bolt-1", address: "/bolt" },
        { item: "bolt-2", address: "/bolt2" },
        { item: "bolt-3", address: "/bolt3" },
      ],
    },
    { main: "accessibility", address: "/accessibillity", img: "imgs/settings_accessibility.svg" },
    { main: "water", address: "/water", img: "imgs/water_drop.svg" },
    {
      main: "settings",
      address: "#",
      img: "imgs/settings.svg",
      subType: "expand",
      sub: [
        { item: "settings-1", address: "/settings" },
        { item: "settings-2", address: "/settings2" },
        { item: "settings-3", address: "/settings3" },
      ],
    },
    // { main: "wate2", address: "#9", img: "imgs/water_drop.svg" },
  ];
  const topHeader = () => {
    return (
      <header className="top_header">
        <div className="header_box">
          {/* <div className="left"> */}
          <div className="logo_box">
            <NavLink to="/">
              <img src="imgs/goesg_logo.png" alt="logo" />
            </NavLink>
          </div>
          <nav>
            <div className="menu_box">
              <ul className="main_menu">{makeNav()}</ul>
            </div>
          </nav>
          <div className="sign_box">
            <div className="signup_box">
              <button className="signup">Sign up</button>
            </div>
            <div>|</div>
            <div className="signin_box">
              <button className="signin">Sign in</button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </header>
    );
  };
  const sideHeader = () => {
    return (
      <header className={`side_header${hidden ? " side_hidden" : ""}`}>
        <div className="header_box">
          <div className="menu_img_box" onClick={clickHidden}>
            <a className="menu">
              <img src="imgs/menu.svg" alt="menu" />
            </a>
          </div>
          <div className="logo_box">
            <NavLink to="/">
              <img src="imgs/logo2.png" alt="logo" />
            </NavLink>
          </div>
          <nav>
            <div className="menu_box">
              <ul className="main_menu">{makeSide()}</ul>
            </div>
          </nav>
        </div>
      </header>
    );
  };
  const makeNav = () => {
    return menuList.map((menu, index) => {
      if (menu.subType) {
        return (
          <li key={index}>
            <NavLink to="#" className="menu_btn">
              {menu.main}
            </NavLink>
            <ul className={`dropdown_menu ${menu.subType}`}>
              {menu.sub.map((sub, index) => {
                return (
                  <li key={index}>
                    <NavLink to={sub.address}>{sub.item}</NavLink>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      } else {
        return (
          <li key={index}>
            <NavLink to={menu.address} className="menu_btn">
              {menu.main}
            </NavLink>
          </li>
        );
      }
    });
  };
  const makeSide = () => {
    return staticList.map((menu, index) => {
      if (menu.subType) {
        return (
          <li key={index}>
            <NavLink to={menu.address} id={menu.main} className="menu_btn" onClick={clickExpand}>
              <img src={menu.img} alt={menu.main} className="icon" />
              <span>{menu.main}</span>
              <img id={menu.main} src="imgs/navigate_next.svg" alt="navigate_next" className={`arrow${expand === menu.main ? " expand" : ""}`} />
            </NavLink>
            <ul className={`dropdown_menu ${menu.main === expand ? menu.subType : ""}`}>
              {menu.sub.map((sub, index) => {
                return (
                  <li key={index}>
                    <NavLink to={sub.address} id={sub.item} className={({ isActive }) => (isActive ? "sub menu_btn checked" : "sub menu_btn")}>
                      {sub.item}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      } else {
        return (
          <li key={index}>
            <NavLink to={menu.address} id={menu.main} className={({ isActive }) => (isActive ? "menu_btn checked" : "menu_btn")}>
              <img src={menu.img} alt={menu.main} className="icon" />
              <span>{menu.main}</span>
            </NavLink>
          </li>
        );
      }
    });
  };
  // const authHeader = () => {
  //   return (
  //     <header className="auth_header">
  //       <div className=""></div>
  //     </header>
  //   );
  // };
  return <>{type === "top" ? topHeader() : sideHeader()}</>;
};

export default Header;
