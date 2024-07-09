import classNames from "classnames/bind";
import style from "@/layouts/DefualtLayout/DefualtLayout.module.scss";
import Header from "@/components/Header/Header.js";
import Footer from "@/components/Footer/Footer.js";
import DoctorGrid from "@/components/DoctorGrid/DoctorGrid.js";
import BannerBar from "@/components/BannerBar/BannerBar";
import Appointment from "@/components/MakeAppointment/Appointment";

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </div>
      <DoctorGrid />
      <BannerBar />
      <Appointment />
      <Footer />
    </div>
  );
}

export default DefaultLayout;
