import classNames from "classnames/bind";
import styles from "../../pages/Doctors Page/style.css";

const cx = classNames.bind(styles);
    
function DoctorItem(props) {
return (
    <div className={cx('tw-wrapper')}>
        <div >
            <div className="tw-flex tw-justify-around tw-mb-8 tw-w-[960px] tw-mx-20 ">
                <div className={cx("doc-picture1")}>
                <img src={props.images} alt="doc1"></img>
                </div> 
                <div className="tw-w-[170px] tw-h-[372px] tw-rounded-xl tw-bg-[#E5661E0D] tw-flex tw-items-center tw-justify-center tw-flex-col tw-rounded-[30px]">
                    <div className="tw-py-8 tw-p-3 tw-h-[300] tw-w-40">
                    <div className="tw-mb-[90px] ">
                            <h3 className="tw-text-[--color2] tw-text-4xl tw-text-center tw-font-semibold"  >{props.certificates}</h3>
                            <p className="tw-font-semibold tw-text-2xl tw-text-[#062126] tw-text-center "> Certificates</p>
                    </div>
                        <div className={cx("certificate-item2")}>
                            <h3 className="tw-text-[--color2] tw-pl-px-[24px] tw-text-center tw-font-semibold tw-text-4xl" >{props.clients}</h3>
                            <p className="tw-font-semibold tw-text-2xl tw-text-[#062126] tw-text-center tw-whitespace-nowrap">Happy clients</p>
                         </div>
                    </div>
                </div>
                <div className="tw-w-[372px] tw-h-[305px] tw-pt-[100px]">
                    <h3 className="tw-font-semibold tw-text-4xl tw-text-[#062126] tw-mb-7">{props.doctor}</h3>
                    <h4 className="tw-font-medium tw-text-4xl tw-text-[--color2] tw-mb-3">{props.position}</h4>
                    <p className="tw-font-normal tw-text-2xl tw-text-[#062126]">{props.describe}</p>
                </div>
            </div>
            
        </div>

    </div>
)
}

export default DoctorItem