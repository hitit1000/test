import React, { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} 에러가 발생했습니다.`);
        return res.json();
      })
      .then((data) => setResult(data))
      .catch((err) => console.log(err.message));
  }, [url]);

  return result;
};

const fetchGet = async (path: string, host?: string, query?: { [key: string]: any }) => {
  let queryString;
  if (query) {
    queryString = Object.keys(query)
      .map((q) => encodeURIComponent(q) + "=" + encodeURIComponent(query[q]))
      .join("&");
  }
  console.log(`${process.env.REACT_APP_SERVER_URL}/${path}${queryString ? "?" + queryString : ""}`);
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/${path}${queryString ? "?" + queryString : ""}`)
    .then((res) => {
      if (!res.ok) throw new Error(`${res.status} 에러가 발생했습니다.`);
      return res.json();
    })
    .then((data) => data)
    .catch((err) => console.log(err.message));
};

const fetchPost = async (host: string, path: string, body: object, headers = {}) => {
  // const url = `https://${host}/${path}`;
  // const options = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     ...headers,
  //   },
  //   body: JSON.stringify(body),
  // };
  // const res = await fetch(url, options);
  // const data = await res.json();
  // if (res.ok) {
  //   return data;
  // } else {
  //   throw Error(data);
  // }
};

export default useFetch;
export { fetchPost, fetchGet };
