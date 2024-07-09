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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import CircularProgress from "@mui/material/CircularProgress";
// Settings page components
import FormField from "layouts/account/components/FormField";

//custom
import Swal_show from "components/Swal";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import postRequest from "components/API_Custom";
import Swal from "sweetalert2";
function NewRoom() {
  const [room, setUsers] = useState({
    roomName: "",
    bedName: "",
    serviceId: "",
  });
  const { roomName, bedName, serviceId } = room;
  const onInputChange = (e) => {
    setUsers({ ...room, [e.target.name]: e.target.value });
  };
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
  });
  api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post("/api/room", {
      roomName,
      bedName,
      serviceId,
    });

    if (response.data.status === "success") {
      Cookies.set('token', response.data.token, { expires: 7 });
      Swal_show('success', 'Success');
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Change password failed",
      });
    }
  };


  const [loading, setLoading] = useState(false);

  const changeForm = () => { };
  return (
    <Card id="change-password">
      <ArgonBox p={3}>
        <ArgonTypography variant="h5">Room</ArgonTypography>
      </ArgonBox>
      <ArgonBox component="form" pb={3} px={3} onChange={changeForm}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              label="room name"
              placeholder="Room Name"
              inputProps={{ type: "number", autoComplete: "" }}
              name="roomName"
              value={roomName}
              onChange={(e) => onInputChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              label="bed name"
              placeholder="Bed Name"
              inputProps={{ type: "number", autoComplete: "" }}
              name="bedName"
              value={bedName}
              onChange={(e) => onInputChange(e)}
            />
          </Grid>

          <Grid item xs={12}>
            <FormField
              label="serviceId"
              placeholder="Service"
              inputProps={{ type: "number", autoComplete: "" }}
              name="serviceId"
              value={serviceId}
              onChange={(e) => onInputChange(e)}
            />
          </Grid>
        </Grid>


        <ArgonBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          flexWrap="wrap"
        >
          <ArgonBox ml="auto">
            <ArgonButton
              variant="gradient"
              color="dark"
              size="small"
              onClick={onSubmit}
              // onClick={changePassword_click}
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress color="inherit" size={24} /> : "Submit"}
            </ArgonButton>
          </ArgonBox>
        </ArgonBox>
      </ArgonBox>
    </Card>
  );
}
export default NewRoom;