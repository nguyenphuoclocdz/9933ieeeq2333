import Cookies from "js-cookie";
import getRequest from "components/API_Get";
import Swal_show from "components/Swal";
import { useNavigate } from "react-router-dom";

const getinfo_user = () => {

    return new Promise((resolve, reject) => {


        const url = "/api/account/info";

        getRequest(url, (response) => {
            if (response.status === "success") {
                resolve(response);
            } else {
                Swal_show('error', 'An error occurred, please log in again!');
                reject({ status: 'error', message: 'An error occurred, please log in again!' });

            }
        });
    });
};

export default getinfo_user;
