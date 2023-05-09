import React, { useEffect, useState } from "react";
import "./Law.scss";
import { initLawOptions, lawInputs } from "../inits";
import { typeLawName } from "../types";
import { fetchGet } from "../Hooks/useFetch";
import { typeLawOptions } from "../types";

const Law = () => {
  const [input, setInput] = useState({ ...lawInputs });
  const [selectOption, setSelectOption] = useState({ ...initLawOptions });
  const [lawReview, setLawReview] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const init = async () => {
      let newInputList: typeLawOptions = { ...initLawOptions };
      const keyMaP: { [key: string]: "region" | "client" | "usage" | "approval" | "construct" | "heating" | "education" | "maintenance" | "rivers" } = {
        지역: "region",
        "발주처 구분": "client",
        "건축물 용도": "usage",
        "사업계획승인/인허가": "approval",
        "신축/재축/증축 구분": "construct",
        "난방 적용 여부": "heating",
        "교육환경보호구역 해당": "education",
        "도시정비사업 해당": "maintenance",
        "4대강 수계 해당": "rivers",
      };
      const { inputList } = await fetchGet("law");
      const newInput = { ...input };
      Object.entries(inputList).map((key: any) => {
        newInputList[keyMaP[key[0]]] = key[1];
        newInput[keyMaP[key[0]]] = key[1][0];
      });
      setSelectOption(newInputList);
      setInput(newInput);
    };
    init();
  }, []);

  const onSubmit = async () => {
    const { review } = await fetchGet("law/review", undefined, input);
    let newLawReview: { [key: string]: string[] } = {};
    Object.keys(review).forEach((key) => {
      if (review[key].length > 0) newLawReview[key] = review[key];
    });
    setLawReview(newLawReview);
  };
  const displayReview = () => {
    return Object.keys(lawReview).map((category, index) => {
      return (
        <div className="review" key={index}>
          <div className="category">{category}</div>
          <div className="item_box">
            {lawReview[category].map((item, index) => {
              return (
                <div className="item" key={index}>
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      );
    });
    return <></>;
  };
  const comma = (value: string) => {
    let result = "0";
    if (value.length >= 20) result = value.slice(0, -1);
    else {
      const newValue = Number(value.replaceAll(",", ""));
      if (!isNaN(newValue)) {
        const formatValue = newValue.toLocaleString("en");
        result = formatValue;
      }
    }
    return result;
  };
  const changeInput = (e: any) => {
    const newObject = { ...input };
    const newInput: typeLawName = e.target.id;
    let newValue = e.target.value;
    if (e.target.type === "text") newValue = comma(newValue);
    newObject[newInput] = newValue;
    setInput(newObject);
  };
  return (
    <>
      <div className="law_wrap">
        <h2>친환경 관련 법규</h2>
        <div className="inputs">
          <div className="input_box">
            <label htmlFor="region">지역</label>
            <select id="region" value={input.region} onChange={changeInput}>
              {selectOption.region.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input_box">
            <label htmlFor="client">발주처 구분</label>
            <select id="client" value={input.client} onChange={changeInput}>
              {selectOption.client.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input_box">
            <label htmlFor="usage">건축물 용도</label>
            <select id="usage" value={input.usage} onChange={changeInput}>
              {selectOption.usage.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input_box">
            <label htmlFor="approval">사업계획승인/인허가</label>
            <select id="approval" value={input.approval} onChange={changeInput}>
              {selectOption.approval.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input_box">
            <label htmlFor="number_of_households">세대수(공동주택일 경우)</label>
            <input type="text" id="number_of_households" value={input.number_of_households} onChange={changeInput} />
          </div>
          <div className="input_box">
            <label htmlFor="land_area">대지면적(㎡)</label>
            <input type="text" id="land_area" value={input.land_area} onChange={changeInput} />
          </div>
          <div className="input_box">
            <label htmlFor="floor_area">연면적(㎡)</label>
            <input type="text" id="floor_area" value={input.floor_area} onChange={changeInput} />
          </div>
          <div className="input_box">
            <label htmlFor="parking_area">지하주차장 연면적(㎡)</label>
            <input type="text" id="parking_area" value={input.parking_area} onChange={changeInput} />
          </div>
          <div className="input_box">
            <label htmlFor="number_of_floors">층수</label>
            <input type="text" id="number_of_floors" value={input.number_of_floors} onChange={changeInput} />
          </div>
          <div className="input_box">
            <label htmlFor="construct">신축/재축/증축 구분</label>
            <select id="construct" value={input.construct} onChange={changeInput}>
              {selectOption.construct.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input_box">
            <label htmlFor="heating">난방 적용 여부</label>
            <select id="heating" value={input.heating} onChange={changeInput}>
              {selectOption.heating.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input_box">
            <label htmlFor="education">교육환경보호구역 해당</label>
            <select id="education" value={input.education} onChange={changeInput}>
              {selectOption.education.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input_box">
            <label htmlFor="maintenance">도시정비사업 해당</label>
            <select id="maintenance" value={input.maintenance} onChange={changeInput}>
              {selectOption.maintenance.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input_box">
            <label htmlFor="rivers">4대강 수계 해당</label>
            <select id="rivers" value={input.rivers} onChange={changeInput}>
              {selectOption.rivers.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button onClick={onSubmit}>법규 검토</button>
        {lawReview ? <div className="review_box">{displayReview()}</div> : null}
      </div>
    </>
  );
};

export default Law;
