import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { TopHeader } from "./Header";

let oldDate: number | null = null;
const AuthLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const loginTimeout = 10;
  const CheckLogout = async () => {
    let result = false;
    const newDate = new Date().getTime();
    if (oldDate === null) {
      oldDate = newDate;
    }
    // console.log(newDate - oldDate);
    if (newDate - oldDate > loginTimeout * 1000) {
      result = true;
      oldDate = null;
      const option = {
        url: `${process.env.REACT_APP_SERVER_URL}/member/logout`,
        method: "post",
        withCredentials: true,
      };
      await axios(option);
      axios.defaults.headers.common["Authorization"] = `Bearer`;
      navigate("/signin", { state: pathname });
    } else oldDate = newDate;
    return result;
  };

  useEffect(() => {
    CheckLogout();
    const at = axios.defaults.headers.common["Authorization"];
    if (at !== undefined && at !== null && at.toString().includes("Bearer ")) {
      // AT가 있다면 ( 만료 여부는 상관 없음 )
      const option = {
        url: `${process.env.REACT_APP_SERVER_URL}/member`,
        method: "get",
        withCredentials: true,
      };
      axios(option)
        .then((res) => {
          const accessToken = res.data.at; // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
          axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`; // accessToken을 localStorage, cookie 등에 저장하지 않는다!
          // console.log("Auth 권한체크 - 엑섹스토큰 =", accessToken);
        })
        .catch((err) => {
          // console.log("Auth 권한체크 - 에러");
          axios.defaults.headers.common["Authorization"] = `Bearer`;
          // console.log(err.message);
          navigate("/signin", { state: pathname });
        });
    } else {
      // AT가 애초에 없음 새로고침으로 판단 //
      // console.log("Auth 권한체크 - AT 없음");
      const option = {
        url: `${process.env.REACT_APP_SERVER_URL}/member/silent`,
        method: "post",
        withCredentials: true,
      };
      axios(option)
        .then((res) => {
          const accessToken = res.data.at; // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
          axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`; // accessToken을 localStorage, cookie 등에 저장하지 않는다!
          // console.log("새로고침 권한체크 - 엑섹스토큰 =", accessToken);
        })
        .catch((err) => {
          // console.log("새로고침 권한체크 - 에러");
          axios.defaults.headers.common["Authorization"] = `Bearer`;
          // console.log(err.message);
          navigate("/signin", { state: pathname });
        });
    }
  });

  return (
    <div className="wrap" style={{ margin: `0 auto `, width: 1440 }}>
      <TopHeader />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
