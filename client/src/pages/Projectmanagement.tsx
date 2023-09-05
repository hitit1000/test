import React, { useState } from "react";
import "./Projectmanagement.scss";
import { Link, useNavigate } from "react-router-dom";

const Projectmanagement = () => {
  const [selectFilter, setSelectFilter] = useState(false);
  const [filter, setFilter] = useState<"전체" | "프로젝트" | "이름" | "주소">("전체");

  const navigate = useNavigate();
  const goHome = () => {
    navigate("/project2");
  };
  const handleAdd = () => {};
  const handleFilter = () => {
    setSelectFilter((pre) => !pre);
  };
  const handleRadio = (e: any) => {
    setFilter(e.target.value);
  };
  const handleTable = (e: React.MouseEvent<HTMLTableRowElement>) => {
    console.log(e.currentTarget.id);
  };
  const example = [
    { project: "project_1", manager: "Cooper", address: "서울 강남구 삼성로 575", createdate: "2022-02-19", projectnumber: "2022021905251" },
    { project: "project_2", manager: "Warren", address: "서울 강남구 선릉로86길 40-4", createdate: "2022-02-19", projectnumber: "202202192351" },
    {
      project: "project_3",
      manager: "Esther",
      address: "경기 남양주시 와부읍 경강로 754",
      createdate: "2022-02-19",
      projectnumber: "2022021001",
    },
    {
      project: "project_4",
      manager: "Cameron",
      address: "충남 당진시 백암로 246",
      createdate: "2021-02-12",
      projectnumber: "2021021902201",
    },
    {
      project: "project_5",
      manager: "Simmons",
      address: "충남 보령시 천북면 나룻개길 54",
      createdate: "2012-05-19",
      projectnumber: "202002190031",
    },
    {
      project: "project_6",
      manager: "Alexander",
      address: "강원 동해시 일출로 10-1",
      createdate: "2023-08-15",
      projectnumber: "202702190501",
    },
    { project: "project_7", manager: "Jenny", address: "서울 성북구 대사관로 40", createdate: "2022-02-19", projectnumber: "202202190001" },
    {
      project: "project_8",
      manager: "Hawkins",
      address: "제주 서귀포시 표선면 민속해안로 381",
      createdate: "2017-12-01",
      projectnumber: "201202190221",
    },
  ];
  return (
    <div className="projectmanagement_wrap">
      <div className="blank"></div>
      <div className="title">
        <h1>Project Management</h1>
        <span className="detail">Manage your project details</span>
      </div>
      <div className="table_wrap">
        <div className="header_box">
          <span className="table_name">Project List</span>
          <div className="btn_box">
            <button className="add" onClick={handleAdd}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 -960 960 960">
                <path fill="white" d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
              <span>Add</span>
            </button>
            <button className="copy">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 -960 960 960">
                <path
                  fill="white"
                  d="M520-400h80v-120h120v-80H600v-120h-80v120H400v80h120v120ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"
                />
              </svg>
              Copy
            </button>
            <button className="delete">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 -960 960 960">
                <path
                  fill="white"
                  d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
        <hr color="#E7EAEE" />
        <div className="filter_box">
          <div className="search_box">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 -960 960 960">
              <path
                fill="#64748B"
                d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
              />
            </svg>
            <input type="text" placeholder="Search by project name, number, manager ..." />
            {filter === "전체" ? <></> : <span>Filter : {filter}</span>}
          </div>

          <div className="filter">
            <button onClick={handleFilter}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 -960 960 960">
                <path
                  fill="#64748B"
                  d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"
                />
              </svg>
              Filter
            </button>
            {selectFilter ? (
              <div className="filter_detail">
                <label htmlFor="all">
                  <input type="radio" id="all" value="전체" checked={filter === "전체"} onChange={handleRadio} />
                  전체
                </label>
                <label htmlFor="project">
                  <input type="radio" id="project" value="프로젝트" checked={filter === "프로젝트"} onChange={handleRadio} />
                  프로젝트
                </label>
                <label htmlFor="name">
                  <input type="radio" id="name" value="이름" checked={filter === "이름"} onChange={handleRadio} />
                  이름
                </label>
                <label htmlFor="address">
                  <input type="radio" id="address" value="주소" checked={filter === "주소"} onChange={handleRadio} />
                  주소
                </label>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th className="col1">PROJECT</th>
              <th className="col2">MANAGER</th>
              <th className="col3">ADDRESS</th>
              <th className="col4">CREATE DATE</th>
              <th className="col5">PROJECT NUMBER</th>
              <th className="col6">EDIT</th>
              {/* <th></th> */}
              <th className="col7">COPY</th>
              <th className="col8">DELETE</th>
            </tr>
          </thead>
          <tbody>
            {example.map((data: any) => {
              return (
                <tr key={data.projectnumber} id={data.projectnumber} onClick={handleTable}>
                  <th className="col1">{data.project}</th>
                  <th className="col2">{data.manager}</th>
                  <th className="col3">{data.address}</th>
                  <th className="col4">{data.createdate}</th>
                  <th className="col5">{data.projectnumber}</th>
                  {/* <th>
                    <input type="button" className="btn_edit" value="Edit" />
                  </th> */}
                  <th className="col6">
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 -960 960 960">
                        <path d="M200-12q-33 0-56.5-23.5T120-92v-560q0-33 23.5-56.5T200-732h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-12H200Zm280-360Zm167-337 57 56-264 264v57h56l265-265 57 56-288 289H360v-170l287-287Zm171 168L647-709l100-100q24-24 57.5-24t56.5 24l56 57q23 23 23 56t-23 56l-99 99Z" />
                      </svg>
                    </button>
                  </th>
                  {/* <th>
                    <input type="button" className="btn_view" value="View" />
                  </th> */}
                  <th className="col7">
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 -960 960 960">
                        <path
                          // fill="white"
                          d="M520-400h80v-120h120v-80H600v-120h-80v120H400v80h120v120ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"
                        />
                      </svg>
                    </button>
                  </th>
                  <th className="col8">
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -960 960 960">
                        <path
                          fill="red"
                          d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                        />
                      </svg>
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projectmanagement;
