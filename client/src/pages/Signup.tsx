import React, { useContext, useState } from "react";

const Signup = () => {
  const [input, setInput] = useState({
    id: "",
    password: "",
    email: "",
    phone: "",
    login_type: "1",
    auth_type: "1",
  });
  const changeInput = (e: any) => {
    const newInput: any = { ...input };
    const targetName = e.target.name;
    newInput[targetName] = e.target.value;
    setInput(newInput);
  };
  const submit = (e: any) => {
    console.log("로그인");
    const body = input;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/member/signup`, options)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} 에러가 발생했습니다.`);
        return res.json();
      })
      .then((data) => data)
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      <div>Signup</div>
      <form action="">
        <input type="text" name="id" value={input.id} onChange={changeInput} />
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={changeInput}
        />
        <input
          type="email"
          name="email"
          value={input.email}
          onChange={changeInput}
        />
        <input
          type="text"
          name="phone"
          value={input.phone}
          onChange={changeInput}
        />
      </form>
      <button type="submit" onClick={submit}>
        <span>로그인</span>
      </button>
    </>
  );
};

export default Signup;
