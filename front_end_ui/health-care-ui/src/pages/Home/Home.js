import classNames from "classnames/bind";
import style from "./Home.module.scss";
import images from "@/assests/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRight,
  faEnvelope,
  faLocationDot,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button/Button.js";

const cx = classNames.bind(style);

function Home() {
  return (
    <article className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("content-block-header")}>
          <div className={cx("content-header")}>
            <h2>Feel Comfort Be Healthy</h2>
          </div>
          <div className={cx("content-description")}>
            <p>
              Our professional team will take care of you, we value your time
              and health.
            </p>
          </div>
          <div className={cx("content-box")}>
            <div className={cx("content-gird")}>
              <div className={cx("grid-item")}>
                <div className={cx("icon")}>
                  {<FontAwesomeIcon icon={faCalendarDays} />}
                </div>
                <div className={cx("text")}>
                  <h3>Make an Appointment</h3>
                  <p>Select best time for you</p>
                </div>
              </div>
              <div className={cx("grid-item")}>
                <div className={cx("icon")}>
                  {<FontAwesomeIcon icon={faUserGroup} />}
                </div>
                <div className={cx("text")}>
                  <h3>Find the Best Doctor</h3>
                  <p>find the best doctor in a minute</p>
                </div>
              </div>
              <div className={cx("grid-item")}>
                <div className={cx("icon")}>
                  {<FontAwesomeIcon icon={faLocationDot} />}
                </div>
                <div className={cx("text")}>
                  <h3>Visit the clinic</h3>
                  <p>take care of your issues</p>
                </div>
              </div>
              <div className={cx("grid-item")}>
                <div className={cx("icon")}>
                  {<FontAwesomeIcon icon={faEnvelope} />}
                </div>
                <div className={cx("text")}>
                  <h3>Ask Questions</h3>
                  <p>Ask questions any time</p>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("content-block-header-button")}>
            <Button
              primary
              large
              rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
            >
              Make Appointment
            </Button>
          </div>
        </div>
        <div className={cx("content-image")}>
          <img src={images.img1} alt="image1" />
        </div>
      </div>
    </article>
  );
}
export default Home;
