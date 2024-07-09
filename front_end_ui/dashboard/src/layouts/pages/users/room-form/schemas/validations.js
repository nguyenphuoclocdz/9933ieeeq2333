/**
=========================================================
* Viện Dưỡng Lão An Nghỉ MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import * as Yup from "yup";
import checkout from "layouts/pages/users/room-form/schemas/form";

const {
  formField: { roomName,bedName ,status },
} = checkout;

const validations = [
  Yup.object().shape({
    [roomName.name]: Yup.number().integer().required(roomName.errorMsg),
    [bedName.name]: Yup.number().integer().required(bedName.errorMsg),
    [status.name]: Yup.number().integer().required(status.errorMsg),
    
  }),
];

export default validations;
