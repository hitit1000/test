import React, { useEffect, useRef, useState } from "react";
import "./ScrollViewBox.scss";

type wrapProps = {
  children?: React.ReactNode;
  width: number | string;
  height: number;
};
const ScrollViewBox = ({ children, width, height }: wrapProps) => {
  const [item, setItem] = useState<any[]>();
  const [fullWidth, setFullWidth] = useState(0);
  const [liWidth, setLiwidth] = useState(0);
  const [maxScrollIndex, setMaxScrollIndex] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const liRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (children) setItem(React.Children.toArray(children));
  }, [children]);
  useEffect(() => {
    setFullWidth(Number(boxRef.current?.clientWidth));
  }, [boxRef]);
  useEffect(() => {
    setLiwidth(Number(liRef.current?.clientWidth));
  }, [liRef, item]);
  useEffect(() => {
    setMaxScrollIndex((item ? item.length : 0) * liWidth - fullWidth);
  }, [item, liWidth, fullWidth]);

  const clickBtn = (direction: string) => {
    if (direction === "left") {
      const newValue = scrollIndex - liWidth;
      if (newValue > 0) setScrollIndex(newValue);
      else setScrollIndex(0);
    } else if (direction === "right") {
      const newValue = scrollIndex + liWidth;
      if (newValue > maxScrollIndex) setScrollIndex(maxScrollIndex);
      else setScrollIndex(newValue);
    }
  };
  const moveSlide = () => {
    let result = {
      transform: `translateX(${-1 * scrollIndex}px)`,
    };
    return result;
  };
  return (
    <>
      <div className="scroll_view_wrap" style={{ width: width, height: height }}>
        <div className="btn_warp btn_left_warp" style={{ visibility: `${scrollIndex === 0 ? "hidden" : "visible"}` }}>
          <button className="btn_box left_btn_box" onClick={() => clickBtn("left")}>
            <div className="btn left_btn"></div>
          </button>
        </div>
        <div className="item_box" ref={boxRef}>
          <ul>
            {item
              ? item.map((item, index) => {
                  return (
                    <li key={index} style={moveSlide()} ref={liRef}>
                      {item}
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="btn_warp btn_right_warp" style={{ visibility: `${maxScrollIndex > 0 ? (scrollIndex === maxScrollIndex ? "hidden" : "visible") : "hidden"}` }}>
          <button className="btn_box right_btn_box" onClick={() => clickBtn("right")}>
            <div className="btn right_btn"></div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ScrollViewBox;
