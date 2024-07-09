import classNames from "classnames/bind";
import style from "@/layouts/DefualtLayout/DefualtLayout.module.scss";
import Header from "@/components/Header/Header.js";
import Footer from "@/components/Footer/Footer.js";

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
