import React, { useState } from "react";
import "./Signin.scss";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, setUser] = useState({ id: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState("");
  const changeInput = (e: any) => {
    if (e.target.name === "id") {
      setUser({ ...user, id: e.target.value });
      // setId(e.target.value);
    } else if (e.target.name === "password") {
      // setPassword(e.target.value);
      setUser({ ...user, password: e.target.value });
    }
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.id !== "" && user.password !== "") {
      setLoading(true);
      const option = {
        url: `${process.env.REACT_APP_SERVER_URL}/member/login`,
        method: "post",
        withCredentials: true,
        data: { id: user.id, password: user.password },
      };
      axios(option)
        .then((res) => {
          setLoading(false);
          const accessToken = res.data.at;
          axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          // console.log("로그인 성공// 엑섹스토큰 =", accessToken);
          if (state) {
            navigate(state);
          } else {
            navigate("/project");
          }
        })
        .catch((err) => {
          setLoading(false);
          setFailed("아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.");
          setUser({ ...user, password: "" });
          axios.defaults.headers.common["Authorization"] = `Bearer`;
          // console.log(err.message);
        });
    } else {
      let result = "";
      if (user.id === "") result = "아이디를 입력해 주세요";
      else result = "비밀번호를 입력해 주세요";
      setFailed(result);
    }
  };
  const loading_page = () => {
    return (
      <div className="loading_spinner_box">
        <div className="loading_spinner" />
        <span>Loadding...</span>
      </div>
    );
  };
  const failed_page = () => {
    return (
      <>
        <div className="failed_box">아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.</div>
      </>
    );
  };
  return (
    <>
      <div className="signin__page">
        {loading ? loading_page() : <></>}
        <div className="left">
          <h1>Welcome back to GeO ESG!</h1>
          <h2>Enter your Credentials to access your account</h2>
          <form onSubmit={onSubmit}>
            <label htmlFor="id">ID</label>
            <input type="text" id="id" name="id" value={user.id} onChange={changeInput} placeholder="Enter your ID" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={user.password} onChange={changeInput} placeholder="Enter your paaword" />
            <button type="submit" disabled={loading}>
              Login
            </button>
            {failed ? <div className="failed_box">{failed}</div> : <></>}
          </form>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
};

export default Login;
