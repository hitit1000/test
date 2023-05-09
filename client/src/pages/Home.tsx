import React, { useRef } from "react";
import "./Home.scss";
import { SlideWrap } from "../components/Slide";
import TestPage1 from "./TestPage1";
import TestPage2 from "./TestPage2";
import ScrollViewBox from "../components/ScrollViewBox";
import ImageBtnBox from "../components/ImageBtnBox";

const Home = () => {
  const partnerList = [, "partner1.png", "partner2.png", "partner3.png", "partner4.png", "partner5.png", "partner6.png", "partner7.png", "partner8.png", "partner9.png"];
  return (
    <>
      <div className="home_wrap">
        <section className="section1">
          <SlideWrap width={1280} height={500} slidStyle={{ borderRadius: "0px 0px 30px 30px" }} autoSlideTime={0} arrowStyle={{ size: 30, thickness: 3, color: "#ffffff" }}>
            <TestPage1 url="/imgs/sample2.jpg" />
            <TestPage1 url="/imgs/sample3.jpg" />
            <TestPage1 url="/imgs/sample4.jpg" />
            <TestPage1 url="/imgs/sample5.jpg" />
            <TestPage1 url="/imgs/sample6.jpg" />
            <TestPage1 url="/imgs/sample1.jpg" />
            <TestPage2 />
          </SlideWrap>
        </section>
        <section className="section2">
          <ScrollViewBox width={1060} height={100}>
            <ImageBtnBox width={100} height={100} path="/imgs/icon1.png" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/icon2.png" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/icon3.png" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/icon4.png" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/icon5.png" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/icon6.png" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/academy5.png" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/process1.png" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/process2.png" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/sample1.jpg" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/sample2.jpg" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/sample3.jpg" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/sample4.jpg" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/sample5.jpg" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/sample6.jpg" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/sample7.jpg" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/sample8.jpg" linkTo="#" />
            <ImageBtnBox width={100} height={100} path="/imgs/sample9.jpg" linkTo="#" />
          </ScrollViewBox>
        </section>
        <section className="section3">
          <h2>
            THE <span>ESG PROCESS</span>
          </h2>
          <div className="contents">
            <div className="content1">
              <div className="left">
                <div className="img_box">
                  <img src="/imgs/process1.png" alt="" />
                </div>
              </div>
              <div className="right">
                <h3>
                  <span>W</span>hy?
                </h3>
                <div className="text_box">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio tempore, nobis totam adipisci doloremque temporibus ratione inventore praesentium sequi. Cupiditate
                  nulla modi aliquam enim dolore laudantium, suscipit tempora! Ex nemo dolores sit nulla iure harum quisquam natus exercitationem ab voluptatibus consequuntur
                  blanditiis architecto iusto a repellat laudantium corporis officia saepe tempora eum, nesciunt, similique doloribus officiis! Suscipit veniam dolorem non cum
                  exercitationem. Eveniet ea maxime error perferendis sint soluta velit ad quibusdam temporibus accusantium, molestiae quod. Eos dolorem, harum incidunt sit numquam
                </div>
              </div>
            </div>
            <div className="content2">
              <div className="left">
                <div className="img_box">
                  <img src="/imgs/process2.png" alt="" />
                </div>
              </div>
              <div className="right">
                <h3>
                  <span>W</span>hat?
                </h3>
                <div className="text_box">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic asperiores voluptatum exercitationem impedit voluptatem accusamus sunt quod tempora sapiente! Optio
                  minima ipsa dolore pariatur repellendus quia iste cumque debitis, recusandae iure aspernatur illum possimus hic. Iste quam quia impedit, mollitia rem, modi nisi
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section4">
          <h2>ESG Academy</h2>
          <div className="academy_box">
            <div className="upper">
              <div className="content">
                <div className="left">
                  <div className="date">
                    2023
                    <span>01.27</span>
                  </div>
                  <div className="title">ESG Reporting</div>
                </div>
                <div className="right">
                  <div className="img_box">
                    <img src="/imgs/academy1.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="left">
                  <div className="date">
                    2023<span>01.27</span>
                  </div>
                  <div className="title">ESG Reporting</div>
                </div>
                <div className="right">
                  <div className="img_box">
                    <img src="/imgs/academy2.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="left">
                  <div className="date">
                    2023<span>01.27</span>
                  </div>
                  <div className="title">ESG Reporting</div>
                </div>
                <div className="right">
                  <div className="img_box">
                    <img src="/imgs/academy3.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="under">
              <div className="content">
                <div className="left">
                  <div className="date">
                    2023
                    <span>01.27</span>
                  </div>
                  <div className="title">ESG Reporting</div>
                </div>
                <div className="right">
                  <div className="img_box">
                    <img src="/imgs/academy4.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="left">
                  <div className="date">
                    2023<span>01.27</span>
                  </div>
                  <div className="title">ESG Reporting</div>
                </div>
                <div className="right">
                  <div className="img_box">
                    <img src="/imgs/academy5.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="left">
                  <div className="date">
                    2023<span>01.27</span>
                  </div>
                  <div className="title">ESG Reporting</div>
                </div>
                <div className="right">
                  <div className="img_box">
                    <img src="/imgs/academy6.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section5">
          <h2>Partnership</h2>
          <span>GO ESG는 보다 나은 서비스를 제공하기 위해 다양한 파트너스와 함께합니다.</span>
          <div className="partner">
            <ul>
              {partnerList.map((partner, index) => {
                return (
                  <li key={index}>
                    <img src={`/imgs/${partner}`} alt="" />
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
