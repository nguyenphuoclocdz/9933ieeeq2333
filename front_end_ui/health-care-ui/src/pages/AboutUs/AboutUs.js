import classNames from "classnames/bind";
import style from "./AboutUs.module.scss";
import images from "@/assests/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";



const cx = classNames.bind(style);

function AboutUs() {
  return (
    <article className={cx("wrapper")}>
      <div className={cx("contents")}>
        <div className={cx("contents-head")}>
          <div className={cx("contents-banner")}>
            <div className={cx("contents-img")}>
              <img src={images.aboutus} alt="imgAboutUs" className={cx("bannerImg")} />
            </div>
            <div className={cx("contents-text")}>
              <div className={cx("container-text")}>
                <p>About Us</p>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("contents-body")}>
          <div className={cx("contents-infor")}>
            <div className={cx("container-icon")}>
              <div className={cx("content-icon")}>
                {<FontAwesomeIcon icon={faQuoteRight} />}
              </div>
            </div>
            <div className={cx("content-description")}>
              <div className={cx("text-infor")}>
                <p>
                  Nullam sodales bibendum nulla ut vulputate. Vivamus auctor tincidunt urna, ac molestie lectus imperdiet id.
                  Maecenas nisl massa, mollis sed sem a, finibus dapibus dui.
                  Phasellus rhoncus, quam id molestie efficitur, elit ipsum blandit diam, ac lobortis lectus nibh quis ligula.
                  Ut nunc erat, lobortis vel ultrices aliquet, efficitur id mauris. Duis posuere hendrerit est lacinia consectetur.
                  Morbi nec volutpat ipsum. Cras blandit efficitur velit ut consequat. Suspendisse potenti.
                </p>
                <p>
                  Quisque vitae nisi tempor, ultricies purus et, maximus metus. Phasellus tempus a lorem vel ultricies. Pellentesque a pharetra tellus, sit amet blandit ante.
                  Morbi sollicitudin lacus ut orci fermentum, in vestibulum nulla egestas. Pellentesque nisi orci, ullamcorper ac bibendum quis, congue eget tellus.
                  In sed est dolor. Mauris gravida sem diam, et placerat metus lacinia non.
                  Morbi pellentesque ultricies ante at ultricies. Suspendisse vulputate elit vel sapien volutpat pharetra. In hac habitasse platea dictumst.
                </p>
                <p>
                  Integer felis lorem, cursus ac leo quis, tristique elementum dolor. In hac habitasse platea dictumst.
                  In hac habitasse platea dictumst. Sed interdum tincidunt suscipit. Sed sit amet tincidunt libero.
                  Praesent id condimentum lacus. Vivamus congue scelerisque pulvinar.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("contents-detail")}>
          <div className={cx("text-title")}>
            <h2>Our Achievement</h2>
          </div>
        </div>
        <div className={cx("content-box")}>
          <div className={cx("content-gird")}>
            <div className={cx("grid-item")}>
              <div className={cx("icon")}>
                <img src={images.C1} alt="imgC1" className={cx("Img")} />
              </div>
              <div className={cx("text-c1")}>
                <h3>Best Dental Clinic of 2020</h3>
                <p>
                  Nullam sodales bibendum nulla ut vulputate. Vivamus auctor tincidunt urna, ac molestie lectus imperdiet id.
                  Maecenas nisl massa, mollis sed sem a, finibus dapibus dui.
                  Phasellus rhoncus, quam id molestie efficitur, elit ipsum blandit diam, ac lobortis lectus nibh quis ligula.
                  Ut nunc erat, lobortis vel ultrices aliquet, efficitur id mauris.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("content-box")}>
          <div className={cx("content-gird")}>
            <div className={cx("grid-item")}>
              <div className={cx("text-c2")}>
                <h3>Best Dental Clinic of 2020</h3>
                <p>
                  Nullam sodales bibendum nulla ut vulputate. Vivamus auctor tincidunt urna, ac molestie lectus imperdiet id.
                  Maecenas nisl massa, mollis sed sem a, finibus dapibus dui.
                  Phasellus rhoncus, quam id molestie efficitur, elit ipsum blandit diam, ac lobortis lectus nibh quis ligula.
                  Ut nunc erat, lobortis vel ultrices aliquet, efficitur id mauris.
                </p>
              </div>
              <div className={cx("icon")}>
                <img src={images.C2} alt="imgC2" className={cx("Img")} />
              </div>
            </div>
          </div>
        </div>
        <div className={cx("content-box")}>
          <div className={cx("content-gird")}>
            <div className={cx("grid-item")}>
              <div className={cx("icon")}>
                <img src={images.C3} alt="imgC2" className={cx("Img")} />
              </div>
              <div className={cx("text-c1")}>
                <h3>Best Dental Clinic of 2020</h3>
                <p>
                  Nullam sodales bibendum nulla ut vulputate. Vivamus auctor tincidunt urna, ac molestie lectus imperdiet id.
                  Maecenas nisl massa, mollis sed sem a, finibus dapibus dui.
                  Phasellus rhoncus, quam id molestie efficitur, elit ipsum blandit diam, ac lobortis lectus nibh quis ligula.
                  Ut nunc erat, lobortis vel ultrices aliquet, efficitur id mauris.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default AboutUs;
