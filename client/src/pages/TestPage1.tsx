import React from "react";
import "./TestPage.scss";

const TestPage1 = ({ url }: { url?: string }) => {
  return (
    <>
      <div className="test111111">
        {url ? (
          <div className="li_box">
            <img src={url} alt="slide_image" />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default TestPage1;
