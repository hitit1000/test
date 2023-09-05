import React from "react";
import "./Overview.scss";
import { NavLink } from "react-router-dom";
import PieDonut from "../components/PieDonut";

const Overview = () => {
  return (
    <>
      <div className="overview">
        <NavLink to="/architeco">
          <div className="img_box">
            <img src="imgs/test111.jpg" alt="" />
            <div className="wave">
              <div className="rect" style={{ height: "70%" }}></div>
              <div className="svg"></div>
            </div>
            <div className="title">기초설계</div>
            <div className="piechart">
              <PieDonut value={30} />
            </div>
          </div>
        </NavLink>
        <NavLink to="/architeco">
          <div className="img_box">
            <img src="imgs/test222.jpg" alt="" />
            <div className="wave">
              <div className="rect" style={{ height: "100%" }}></div>
              <div className="svg"></div>
            </div>
            <div className="title">제로에너지 인증</div>
            <div className="piechart">
              <PieDonut value={0} />
            </div>
          </div>
        </NavLink>
        <NavLink to="/architeco">
          <div className="img_box">
            <img src="imgs/test333.jpg" alt="" />
            <div className="wave">
              <div className="rect" style={{ height: "100%" }}></div>
              <div className="svg"></div>
            </div>
            <div className="title">감축방안</div>
            <div className="piechart">
              <PieDonut value={0} />
            </div>
          </div>
        </NavLink>
        <NavLink to="/architeco">
          <div className="img_box">
            <img src="imgs/test444.jpg" alt="" />
            <div className="wave">
              <div className="rect" style={{ height: "100%" }}></div>
              <div className="svg"></div>
            </div>
            <div className="title">성과계약</div>
            <div className="piechart">
              <PieDonut value={0} />
            </div>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default Overview;
