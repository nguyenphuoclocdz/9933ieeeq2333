import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button/Button.js";
import classNames from "classnames/bind";
import style from "@/components/Header/Header.module.scss";
import images from "@/assests/images";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(style);

function Header() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <header className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("logo")}>
          <Link to="/">
            <img src={images.logo} alt="logo" />
          </Link>
        </div>
        <div className={cx("container-nav")}>
          <ul className={cx("nav")}>
            <li>
              <Link to="/" onClick={scrollToTop()}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/product" onClick={scrollToTop()}>
                Our Services
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={scrollToTop()}>
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={scrollToTop()}>
                Contact us
              </Link>
            </li>
          </ul>
        </div>
        <div className={cx("actions")}>
          <Button
            outline
            href="http://localhost:3001/authentication/sign-up/cover"
            rightIcon={<FontAwesomeIcon icon={faPenToSquare} />}
          >
            Sign Up
          </Button>
          <Button
            primary
            href="http://localhost:3001/authentication/sign-in/cover"
            rightIcon={<FontAwesomeIcon icon={faArrowRightToBracket} />}
          >
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
