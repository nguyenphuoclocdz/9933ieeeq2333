import classNames from "classnames/bind";
import styles from "./DoctorGrid.module.scss";
import Button from "@/components/Button/Button.js";
import Doctors from "@/assests/DoctorData/data.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function DoctorGrid() {
  return (
    <article className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("contents")}>
          <div className={cx("content-head")}>
            <div className={cx("content-head-title")}>
              <h1>Our Qualified Doctors</h1>
            </div>
            <div className={cx("content-head-action")}>
              <Button
                outline
                to="/doctors"
                large
                rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
              >
                See All Doctors
              </Button>
            </div>
          </div>
          <div className={cx("content-grid")}>
            {Doctors.map((Doctor) => (
              <div className={cx("doctor-card")} key={Doctor.id}>
                <div className={cx("doctor-card-content")}>
                  <div className={cx("doctor-image")}>
                    <img src={Doctor.urlImage} alt="doctor-img"></img>
                  </div>
                  <div className={cx("doctor-name")}>
                    <h2>{Doctor.name}</h2>
                  </div>
                  <div className={cx("doctor-position")}>
                    <p>{Doctor.position}</p>
                  </div>
                  <div className={cx("doctor-score")}>
                    <p>{Doctor.score}</p>
                  </div>
                  <div className={cx("doctor-address")}>
                    <p>{Doctor.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default DoctorGrid;
