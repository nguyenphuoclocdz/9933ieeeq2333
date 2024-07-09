import MakeAppointment from "@/components/MakeAppointment/Appointment.js" 
import classNames from "classnames/bind";
import styles from "./Contact.module.scss";

const cx = classNames.bind(styles);

function Contact() {
  return <div className={cx("wrapper")}>
    <MakeAppointment />
  </div>;
}

export default Contact;
