import React, { useEffect, useRef, useState } from "react";
import useInterval from "../Hooks/useInterval";
import "./SlideImg.scss";

type propsType = { contents: string[]; autoSlideTime?: number };
const Slide = ({ contents, autoSlideTime }: propsType) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [sliceIndex, setSliceIndex] = useState(0);
  const [preSlideIndex, setPreSlideIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState(-1);
  const [mouseAction, setMouseAction] = useState(0);
  const [fullWidth, setFullWidth] = useState(0);
  const [items, setItems] = useState([""]);
  const [itemsCount, setItemsCount] = useState(0);
  const [mousePressed, setMousePressed] = useState(false);

  useEffect(() => {
    setItemsCount(contents.length);
    setItems(contents);
  }, [contents]);

  useEffect(() => {
    setFullWidth(Number(boxRef.current?.clientWidth));
  }, [boxRef]);

  useInterval(
    () => {
      if (autoSlide >= Number(autoSlideTime)) {
        setPreSlideIndex(sliceIndex);
        setSliceIndex((pre) => (pre < itemsCount - 1 ? pre + 1 : 0));
        setAutoSlide(0);
      }
      setAutoSlide((pre) => pre + 1);
    },
    autoSlideTime === undefined || autoSlideTime === 0 ? 99999999999999 : 1000
  );

  const slideClick = (e: any) => {
    console.log("click arrow&click page");
    setPreSlideIndex(sliceIndex);
    setSliceIndex(Number(e.target.name));
    setAutoSlide(0);
  };

  const checkVector = () => {
    if (sliceIndex === 0 && preSlideIndex === itemsCount - 1) {
      return "right";
    } else if (sliceIndex === itemsCount - 1 && preSlideIndex === 0) {
      return "left";
    } else {
      if (sliceIndex - preSlideIndex > 0) {
        return "right";
      } else {
        return "left";
      }
    }
  };

  const slidePosition = (index: number) => {
    if (findRole(index) !== "empty") {
      // 드래그 시에는 즉각반응하며, 드래그가 끝날 시 애니메이션 추가
      let result = { transition: `${mousePressed ? "ease-out 0s" : "ease-out 0.3s"}`, transform: `translateX(${-1 * (0 + (mouseAction / fullWidth) * 100)}%)` };
      if (itemsCount === 3) {
        // 이동방향에 따른 다음 슬라이드를 숨겨서 이동 ( 좌우측 마지막 슬라이드에서 반대로 넘어갈때를 위해 사용 )
        if (checkVector() === "left") {
          if (findRole(index) === "prev") {
            result = { transition: "ease-out 0s", transform: `translateX(${-1 * (0 + (mouseAction / fullWidth) * 100)}%)` };
          }
        } else if (checkVector() === "right") {
          if (findRole(index) === "next") {
            result = { transition: "ease-out 0s", transform: `translateX(${-1 * (0 + (mouseAction / fullWidth) * 100)}%)` };
          }
        }
      } else if (itemsCount === 2) {
        result = { transition: "ease-out 0s", transform: `translateX(0%)` };
      }
      return result;
    }
  };

  const mouseDownMoment = (e: any) => {
    setMousePosition(e.pageX);
    setMousePressed(true);
  };
  const mouseMovement = (e: any) => {
    if (mousePosition !== -1) {
      setMouseAction(mousePosition - e.pageX);
    }
  };
  const mouseUpMoment = (e: any) => {
    setMousePressed(false);
    const vector = mousePosition - e.pageX;
    if (mousePosition !== -1) {
      let index = sliceIndex;
      if (Math.abs(vector) > 100) {
        if (vector < 0) {
          index = sliceIndex - 1;
          if (sliceIndex === 0) {
            index = itemsCount - 1;
          }
        }
        if (vector > 0) {
          index = sliceIndex + 1;
          if (sliceIndex === itemsCount - 1) {
            index = 0;
          }
        }
      }
      setPreSlideIndex(sliceIndex);
      setSliceIndex(index);
    }
    setAutoSlide(0);
    setMousePosition(-1);
    setMouseAction(0);
  };

  const nextIndex = (index: number) => {
    let nextIndex = index + 1;
    if (nextIndex >= itemsCount) nextIndex = 0;
    return nextIndex;
  };
  const prevIndex = (index: number) => {
    let prevIndex = index - 1;
    if (prevIndex <= -1) prevIndex = itemsCount - 1;
    return prevIndex;
  };
  
  const findRole = (index: number) => {
    let role: string = "empty";
    if (sliceIndex === index) {
      role = "active";
    } else if (sliceIndex === prevIndex(index)) {
      role = "next";
    } else if (sliceIndex === nextIndex(index)) {
      role = "prev";
    }
    return role;
  };

  return (
    <>
      <div className="slide_box" ref={boxRef} onMouseDown={mouseDownMoment} onMouseUp={mouseUpMoment} onMouseLeave={mouseUpMoment} onMouseMove={mouseMovement}>
        <div className="radio_box">
          {itemsCount > 1
            ? items.map((content, index) => {
                return <input type="radio" name={String(index)} id={`slide${index}`} className={`slide_btn`} checked={sliceIndex === index} onChange={slideClick} key={index} />;
              })
            : null}
        </div>
        <div className="slide_wrap">
          <ul className="slide_list">
            {items.map((content, index) => {
              return (
                <li style={slidePosition(index)} key={index} className={findRole(index)}>
                  <div className="li_box">
                    <img src={content} alt="slide_image" />
                  </div>
                </li>
              );
            })}
            {itemsCount > 1 ? (
              <div className="arrow_box">
                <label htmlFor={`slide${prevIndex(sliceIndex)}`} className={`arrow_left`}></label>
                <label htmlFor={`slide${nextIndex(sliceIndex)}`} className={`arrow_right`}></label>
              </div>
            ) : null}
            <div className="pagination_box">
              <ul>
                {itemsCount > 1
                  ? items.map((content, index) => {
                      return (
                        <li className="pagination_ul_li" key={index}>
                          <label htmlFor={`slide${index}`} className={sliceIndex === index ? "active" : ""}></label>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Slide;
