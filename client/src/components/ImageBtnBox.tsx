import React from "react";
import { Link } from "react-router-dom";
type wrapProps = {
  path: string;
  linkTo: string;
  width: number | string;
  height: number | string;
};
const ImageBtnBox = ({ path, linkTo, width, height }: wrapProps) => {
  return (
    <>
      <Link to={linkTo}>
        <div className="item_image_type">
          <img src={path} alt="" style={{ width: width, height: height }} />
        </div>
      </Link>
    </>
  );
};

export default ImageBtnBox;
