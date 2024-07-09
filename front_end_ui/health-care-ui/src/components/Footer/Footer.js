import images from "@/assests/images";
import classNames from "classnames/bind";
import style from "@/components/Footer/Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Button from "../Button/Button";

const cx = classNames.bind(style);

function Footer() {
  return (
    <footer>
      <div className={cx("wrapper")}>
        <div className={cx("content")}>
          <div className={cx("content-head")}>
            <div className={cx("content-info")}>
              <div className={cx("content-Logo")}>
                <img src={images.logo} alt="logo" />
              </div>
              <div className={cx("content-address")}>
                <p>1429 Something Bridge, LA 4281</p>
              </div>
              <div className={cx("content-phone")}>
                <h4>Call: (321) 428 321 3902</h4>
              </div>
              <div className={cx("container-icon")}>
                <div className={cx("content-icon")}>
                  <div className={cx("icon")}>
                    {<FontAwesomeIcon icon={faFacebookF} />}
                  </div>
                </div>
                <div className={cx("content-icon")}>
                  <div className={cx("icon")}>
                    {<FontAwesomeIcon icon={faLinkedinIn} />}
                  </div>
                </div>
                <div className={cx("content-icon")}>
                  <div className={cx("icon")}>
                    {<FontAwesomeIcon icon={faXTwitter} />}
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("content-explore")}>
              <div className={cx("content-explore-title")}>
                <h3>Explore</h3>
              </div>
              <div className={cx("content-explore-list")}>
                <ul>
                  <li>Feature</li>
                  <li>About us</li>
                  <li>FAQs</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
            <div className={cx("content-legal")}>
              <div className={cx("content-legal-title")}>
                <h3>Legal</h3>
              </div>
              <div className={cx("content-legal-list")}>
                <ul>
                  <li>Privacy Policy</li>
                  <li>Terms of Services</li>
                  <li>Documentations</li>
                  <li>Help Center</li>
                </ul>
              </div>
            </div>
            <div className={cx("content-subscribe")}>
              <div className={cx("content-subcribe-title")}>
                <h3>Subscribe</h3>
              </div>
              <div className={cx("content-subcribe-description")}>
                <p>Subscribe to get the latest news from us</p>
              </div>
              <div className={cx("content-subcribe-input")}>
                <input
                  className={cx("content-innut")}
                  placeholder="Your Email"
                  spellCheck={false}
                ></input>
                <Button primary medium>
                  Subcribe
                </Button>
              </div>
            </div>
          </div>
          <div className={cx("content-copyright")}>
            <div className={cx("copyright")}>
              <h4>© 2021 iMedical, All Rights Reserved</h4>
            </div>
            <div className={cx("policy")}>
              <h4>Privacy Policy</h4>
              <h4>Terms of Services</h4>
              <h4>Accesibility</h4>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
