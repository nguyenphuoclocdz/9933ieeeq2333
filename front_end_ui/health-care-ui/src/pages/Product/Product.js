import classNames from "classnames/bind";
import style from "./Product.module.scss";
import images from "@/assests/images";

const cx = classNames.bind(style);

function Product() {
  return (
    <article className={cx("wrapper")}>
      <div className={cx("contents")}>
        <div className={cx("contents-banner")}>
          <div className={cx("contents-img")}>
            <div>
              {" "}
              <img
                src={images.img39}
                alt="imgProduct"
                className={cx("imgBanner")}
              ></img>
            </div>
            <div className={cx("contents-text")}>
              <div className={cx("text")}>
                <p>Our Services</p>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("contents-body")}>
          <div className={cx("content-1")}>
            <div className={cx("imgBody1")}>
              <img src={images.img5} alt="01"></img>
            </div>
            <div className={cx("content")}>
              <p className={cx("title")}>Immediate Care</p>
              <p className={cx("p")}>
                Sed vel mollis mi. Pellentesque molestie ornare venenatis.
                Maecenas sagittis egestas erat non volutpat. Aliquam vel lectus
                nec quam gravida pharetra. Duis nec enim eu odio placerat mollis
                quis et arcu...
              </p>
            </div>
            <div className={cx("calendar")}>
              <div className={cx("calendar-head")}>
                <div className={cx("logoC")}>
                  <img src={images.calendar} alt="logo"></img>
                </div>
                <div className={cx("head-text")}>
                  <p>Available Times</p>
                </div>
              </div>
              <div className={cx("calendar-body")}>
                <div className={cx("logoL1")}>
                  <img src={images.location} alt="location"></img>
                </div>
                <div className={cx("cbc-t")}>Brighton beach ave 23/2</div>
                <div className={cx("logoL2")}>
                  <img src={images.location} alt="location"></img>
                </div>
                <div className={cx("cbc-t2")}>
                  Bay Ridge Ave, Brooklyn, NY 11220
                </div>
                <div className={cx("cbc")}>
                  <div className={cx("cbc-day1")}>
                    <p>Mon-Fri</p>
                  </div>
                  <div className={cx("cbc-time")}>
                    <p>11:00-20:00</p>
                  </div>
                  <div className={cx("cbc-day2")}>
                    <p>Weekends</p>
                  </div>
                  <div className={cx("cbc-time")}>
                    <p>12:00-14:00</p>
                  </div>
                </div>

                <div className={cx("cbc")}>
                  <div className={cx("cbc-day1")}>
                    <p>Mon-Fri</p>
                  </div>
                  <div className={cx("cbc-time")}>
                    <p>11:00-20:00</p>
                  </div>
                  <div className={cx("cbc-day2")}>
                    <p>Weekends</p>
                  </div>
                  <div className={cx("cbc-time")}>
                    <p>12:00-14:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("content-2")}>
            <div className={cx("imgBody2")}>
              <img src={images.img6} alt="2"></img>
            </div>
            <div className={cx("content")}>
              <p className={cx("title")}>Dental Care</p>
              <p className={cx("p")}>
                Curabitur lectus dolor, ullamcorper eu velit eu, sodales dictum
                elit. Ut dolor nisi, consequat sed luctus ut, aliquam sit amet
                nisi. Suspendisse nibh velit, iaculis sed nulla non, imperdiet
                euismod orci.
              </p>
            </div>
            <div className={cx("calendar")}>
              <div className={cx("calendar-head")}>
                <div className={cx("logoC")}>
                  <img src={images.calendar} alt="calendar"></img>
                </div>
                <div className={cx("head-text")}>
                  <p>Available Times</p>
                </div>
              </div>
              <div className={cx("calendar-body")}>
                <div className={cx("logoL1")}>
                  <img src={images.location} alt="location"></img>
                </div>
                <div className={cx("cbc-t")}>Brighton beach ave 23/2</div>
                <div className={cx("logoL2")}>
                  <img src={images.location} alt="location"></img>
                </div>
                <div className={cx("cbc-t2")}>
                  Bay Ridge Ave, Brooklyn, NY 11220
                </div>
                <div className={cx("cbc")}>
                  <div className={cx("cbc-day1")}>
                    <p>Mon-Fri</p>
                  </div>
                  <div className={cx("cbc-time")}>
                    <p>11:00-20:00</p>
                  </div>
                  <div className={cx("cbc-day2")}>
                    <p>Weekends</p>
                  </div>
                  <div className={cx("cbc-time")}>
                    <p>12:00-14:00</p>
                  </div>
                </div>

                <div className={cx("cbc")}>
                  <div className={cx("cbc-day1")}>
                    <p>Mon-Fri</p>
                  </div>
                  <div className={cx("cbc-time")}>
                    <p>11:00-20:00</p>
                  </div>
                  <div className={cx("cbc-day2")}>
                    <p>Weekends</p>
                  </div>
                  <div className={cx("cbc-time")}>
                    <p>12:00-14:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("content-3")}>
            <div className={cx("imgBody3")}>
              <img src={images.img40} alt="3"></img>
            </div>
            <div className={cx("content")}>
              <p className={cx("title")}>Surgey Center</p>
              <p className={cx("p")}>
                Curabitur lectus dolor, ullamcorper eu velit eu, sodales dictum
                elit. Ut dolor nisi, consequat sed luctus ut, aliquam sit amet
                nisi. Suspendisse nibh velit, iaculis sed nulla non, imperdiet
                euismod orci.
              </p>
            </div>
            <div className={cx("calendar")}>
              <div className={cx("calendar-head")}>
                <div className={cx("logoC")}>
                  <img src={images.calendar} alt="location"></img>
                </div>
                <div className={cx("head-text")}>
                  <p>Available Times</p>
                </div>
              </div>
              <div className={cx("calendar-body")}>
                <div className={cx("logoL1")}>
                  <img src={images.location} alt="location"></img>
                </div>
                <div className={cx("cbc-t")}>Brighton beach ave 23/2</div>
                <div className={cx("logoL2")}>
                  <img src={images.location} alt="location"></img>
                </div>
                <div className={cx("cbc-t2")}>
                  Bay Ridge Ave, Brooklyn, NY 11220
                </div>
                <div className={cx("cbc")}>
                  <div className={cx("cbc-day1")}>
                    <p>Mon-Fri</p>
                  </div>
                  <div className={cx("cbc-time")}>
                    <p>11:00-20:00</p>
                  </div>
                  <div className={cx("cbc-day2")}>
                    <p>Weekends</p>
                  </div>
                  <div className={cx("cbc-time")}>
                    <p>12:00-14:00</p>
                  </div>
                </div>

                <div className={cx("cbc")}>
                  <div className={cx("cbc-day1")}>
                    <p>Mon-Fri</p>
                  </div>
                  <div className={cx("cbc-time")}>
                    <p>11:00-20:00</p>
                  </div>
                  <div className={cx("cbc-day2")}>
                    <p>Weekends</p>
                  </div>
                  <div className={cx("cbc-time")}>
                    <p>12:00-14:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("content-4")}>
            <div className={cx("imgBody4")}>
              <img src={images.img41} alt="4"></img>
            </div>
            <div className={cx("content")}>
              <p className={cx("title")}>Diagnostic Center</p>
              <p className={cx("p")}>
                Curabitur lectus dolor, ullamcorper eu velit eu, sodales dictum
                elit. Ut dolor nisi, consequat sed luctus ut, aliquam sit amet
                nisi. Suspendisse nibh velit, iaculis sed nulla non, imperdiet
                euismod orci.
              </p>
            </div>
            <div className={cx("calendar")}>
              <div className={cx("calendar-head")}>
                <div className={cx("logoC")}>
                  <img src={images.calendar} alt="calendar"></img>
                </div>
                <div className={cx("head-text")}>
                  <p>Available Times</p>
                </div>
              </div>
              <div className={cx("calendar-body")}>
                <div className={cx("logoL1")}>
                  <img src={images.location} alt="location"></img>
                </div>
                <div className={cx("cbc-t")}>Brighton beach ave 23/2</div>
                <div className={cx("logoL2")}>
                  <img src={images.location} alt="location"></img>
                </div>
                <div className={cx("cbc-t2")}>
                  Bay Ridge Ave, Brooklyn, NY 11220
                </div>
                <div className={cx("cbc")}>
                  <div className={cx("cbc-day1")}>
                    <p>Mon-Fri</p>
                  </div>
                  <div className={cx("cbc-time")}>
                    <p>11:00-20:00</p>
                  </div>
                  <div className={cx("cbc-day2")}>
                    <p>Weekends</p>
                  </div>
                  <div className={cx("cbc-time")}>
                    <p>12:00-14:00</p>
                  </div>
                </div>

                <div className={cx("cbc")}>
                  <div className={cx("cbc-day1")}>
                    <p>Mon-Fri</p>
                  </div>
                  <div className={cx("cbc-time")}>
                    <p>11:00-20:00</p>
                  </div>
                  <div className={cx("cbc-day2")}>
                    <p>Weekends</p>
                  </div>
                  <div className={cx("cbc-time")}>
                    <p>12:00-14:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
export default Product;
