import React, { useEffect, useRef, useState } from "react";
import useInterval from "../Hooks/useInterval";
import "./Slide.scss";

type wrapProps = {
  children?: React.ReactNode;
  autoSlideTime?: number;
  width: number;
  height: number;
  slidStyle?: { borderRadius?: string };
  arrowStyle?: { visible?: boolean; thickness?: number; size?: number; color?: string };
  paginationStyle?: { visible?: boolean; size?: number; color?: string; shape?: "circle" | "square" };
};

const SlideWrap = ({ children, width, height, autoSlideTime, slidStyle, arrowStyle, paginationStyle }: wrapProps) => {
  const [item, setItem] = useState<any[]>([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [preSlideIndex, setPreSlideIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(0);
  const [mouseEvent, setMouseEvent] = useState({ pressed: false, startPoint: -1, currentPoint: 0 });
  const [fullWidth, setFullWidth] = useState(0);
  const [sudden, setSudden] = useState(false);
  const [style, setStyle] = useState({
    slide: { borderRadius: "0px" },
    arrow: { visible: true, borderTop: "3px solid #000", borderRight: "3px solid #000", width: "30px", height: "30px" },
    pagination: { visible: true },
  });
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setFullWidth(Number(boxRef.current?.clientWidth));
  }, [boxRef]);

  useEffect(() => {
    if (children) setItem(React.Children.toArray(children));
  }, [children]);

  useEffect(() => {
    const borderRadius = slidStyle?.borderRadius !== undefined ? slidStyle?.borderRadius : "0px";
    setStyle((preStyle) => {
      return { ...preStyle, slide: { ...preStyle.slide, borderRadius: borderRadius } };
    });
  }, [slidStyle]);
  useEffect(() => {
    const visible = arrowStyle?.visible !== undefined ? arrowStyle?.visible : true;
    const borderTop = `${arrowStyle?.thickness ? arrowStyle.thickness : 2}px solid ${arrowStyle?.color ? arrowStyle.color : "#000"}`;
    const borderRight = `${arrowStyle?.thickness ? arrowStyle.thickness : 2}px solid ${arrowStyle?.color ? arrowStyle.color : "#000"}`;
    const size = `${arrowStyle?.size ? arrowStyle.size : 30}px`;
    setStyle((preStyle) => {
      return { ...preStyle, arrow: { ...preStyle.arrow, visible: visible, borderTop: borderTop, borderRight: borderRight, width: size, height: size } };
    });
  }, [arrowStyle]);

  useEffect(() => {
    const visible = paginationStyle?.visible !== undefined ? paginationStyle?.visible : true;
    setStyle((preStyle) => {
      return { ...preStyle, pagination: { ...preStyle.pagination, visible: visible } };
    });
  }, [paginationStyle]);

  const pageStyle = (index: number) => {
    const color = `${paginationStyle?.color ? paginationStyle.color : "#2e5326"}`;
    return {
      backgroundColor: slideIndex === index ? color : "rgb(180, 180, 180)",
      width: `${paginationStyle?.size ? paginationStyle.size : 10}px`,
      height: `${paginationStyle?.size ? paginationStyle.size : 10}px`,
      borderRadius: paginationStyle?.shape ? (paginationStyle.shape === "circle" ? "100%" : "20%") : "100%",
    };
  };

  useInterval(
    () => {
      if (autoSlide >= Number(autoSlideTime)) {
        setPreSlideIndex(slideIndex);
        setSlideIndex((pre) => (pre < item.length - 1 ? pre + 1 : 0));
        setAutoSlide(0);
      }
      setAutoSlide((pre) => pre + 1);
    },
    autoSlideTime === undefined || autoSlideTime === 0 ? 99999999999999 : 1000
  );

  const changeSlide = (e: any) => {
    setSudden(!(Math.abs(Number(e.target.name) - slideIndex) === 1 || Math.abs(Number(e.target.name) - slideIndex) === item.length - 1));
    setPreSlideIndex(slideIndex);
    setSlideIndex(Number(e.target.name));
    setAutoSlide(0);
  };

  const checkVector = () => {
    if (slideIndex === 0 && preSlideIndex === item.length - 1) {
      return "right";
    } else if (slideIndex === item.length - 1 && preSlideIndex === 0) {
      return "left";
    } else {
      if (slideIndex - preSlideIndex > 0) {
        return "right";
      } else {
        return "left";
      }
    }
  };
  const moveSlide = (index: number) => {
    if (findRole(index) !== "empty") {
      // 드래그 시에는 즉각반응하며, 드래그가 끝날 시 애니메이션 추가
      // let result = { transition: `${mouseEvent.pressed ? "ease-out 0s" : "ease-out 0.3s"}`, transform: `translateX(${-1 * (0 + (mouseEvent.currentPoint / fullWidth) * 100)}%)` };
      let result = {
        transition: `${mouseEvent.pressed ? "ease-out 0s" : sudden ? "ease-out 0s" : "ease-out 0.3s"}`,
        transform: `translateX(${-1 * (0 + (mouseEvent.currentPoint / fullWidth) * 100)}%)`,
      };
      if (item.length === 3) {
        // 이동방향에 따른 다음 슬라이드를 숨겨서 이동 ( 좌우측 마지막 슬라이드에서 반대로 넘어갈때를 위해 사용 )
        if (checkVector() === "left") {
          if (findRole(index) === "prev") {
            result = { transition: "ease-out 0s", transform: `translateX(${-1 * (0 + (mouseEvent.currentPoint / fullWidth) * 100)}%)` };
          }
        } else if (checkVector() === "right") {
          if (findRole(index) === "next") {
            result = { transition: "ease-out 0s", transform: `translateX(${-1 * (0 + (mouseEvent.currentPoint / fullWidth) * 100)}%)` };
          }
        }
      } else if (item.length === 2) {
        result = { transition: "ease-out 0s", transform: `translateX(0%)` };
      }
      return result;
    }
  };
  const findRole = (index: number) => {
    let role: string = "empty";
    if (slideIndex === index) {
      role = "active";
    } else if (slideIndex === prevIndex(index)) {
      role = "next";
    } else if (slideIndex === nextIndex(index)) {
      role = "prev";
    }
    return role;
  };

  const prevIndex = (index: number) => {
    let prevIndex = index - 1;
    if (prevIndex <= -1) prevIndex = item.length - 1;
    return prevIndex;
  };
  const nextIndex = (index: number) => {
    let nextIndex = index + 1;
    if (nextIndex >= item.length) nextIndex = 0;
    return nextIndex;
  };

  const mouseDownEvent = (e: any) => {
    setSudden(false);
    setMouseEvent((prev) => {
      return { ...prev, startPoint: e.pageX, pressed: true };
    });
  };
  const mouseMoveEvent = (e: any) => {
    if (mouseEvent.startPoint !== -1) {
      setMouseEvent((prev) => {
        return { ...prev, currentPoint: mouseEvent.startPoint - e.pageX };
      });
    }
  };
  const mouseUpEvent = (e: any) => {
    setMouseEvent((prev) => {
      return { ...prev, pressed: false };
    });
    const vector = mouseEvent.startPoint - e.pageX;
    if (mouseEvent.startPoint !== -1) {
      let index = slideIndex;
      if (Math.abs(vector) > 100) {
        if (vector < 0) {
          index = slideIndex - 1;
          if (slideIndex === 0) {
            index = item.length - 1;
          }
        }
        if (vector > 0) {
          index = slideIndex + 1;
          if (slideIndex === item.length - 1) {
            index = 0;
          }
        }
      }
      setPreSlideIndex(slideIndex);
      setSlideIndex(index);
    }
    setAutoSlide(0);
    setMouseEvent((prev) => {
      return { ...prev, startPoint: -1, currentPoint: 0 };
    });
  };
  return (
    <>
      <div
        className="slide_wrap"
        style={{ width: `${width}px`, height: `${height}px`, borderRadius: style.slide.borderRadius }}
        ref={boxRef}
        onMouseDown={mouseDownEvent}
        onMouseUp={mouseUpEvent}
        onMouseLeave={mouseUpEvent}
        onMouseMove={mouseMoveEvent}
      >
        <div className="item_box">
          <ul>
            {item.map((content, index) => {
              return (
                <li key={index} style={moveSlide(index)} className={findRole(index)}>
                  {content}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pointer_box">
          {item.map((content, index) => {
            return <input type="radio" name={String(index)} id={`slide${index}`} className="pointer" onChange={changeSlide} checked={slideIndex === index} key={index} />;
          })}
        </div>
        {style.arrow.visible ? (
          <div className="arrow_box">
            <label htmlFor={`slide${prevIndex(slideIndex)}`} className="arrow_left" style={style.arrow}></label>
            <label htmlFor={`slide${nextIndex(slideIndex)}`} className="arrow_right" style={style.arrow}></label>
          </div>
        ) : null}
        {style.pagination.visible ? (
          <div className="pagination_box">
            <ul>
              {item.length > 1
                ? item.map((content, index) => {
                    return (
                      <li key={index}>
                        <label htmlFor={`slide${index}`} style={pageStyle(index)}></label>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
};

const Slide = () => {};

export default Slide;
export { SlideWrap };
