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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";
import Icon from "@mui/material/Icon";
// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonButton from "components/ArgonButton";
// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// Image
import Swal from "sweetalert2";
import Captcha from "components/Captcha";
import CaptchaComponent from "components/Captcha";
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);


  const api = axios.create({
    baseURL: 'http://localhost:8080',  // Đổi lại đường dẫn phù hợp với backend của bạn
    withCredentials: true,  // Sử dụng cookie trong yêu cầu
  });

  const [user, setUsers] = useState({
    "username": "",
    "password": "",
    "captcha": "",
    "rememberme": false
  });
  const [loading, setLoading] = useState(false);


  const [statuspassword, setStatuspassword] = useState('Your password needs to have at least 6 characters!');
  const [statuspasswordcolor, setStatuspasswordcolor] = useState('warning');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "rememberme") {
      setUsers({ ...user, rememberme: !user.rememberme });
    } else {
      setUsers({ ...user, [e.target.name]: e.target.value });
    }

    console.log(user);
  };

  const login = async (e) => {

    if (user.Name == "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Username!",
      });
    } else

      if (user.Password == "") {
        Swal.fire({
          icon: "warning",
          title: "Please enter Password!",
        });
      } else {
        setLoading(true);
        const response = api.post("http://localhost:8080/api/users/login", user).then(response => {

          if (response.data.status === "success") {
            setLoading(false);
            // Login successful
            Swal.fire({
              icon: "success",
              title: "Nice!",
              text: "Login successful!",
            });

            //navigate("/home");
          } else {
            setLoading(false);
            // Login failed
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.data.message,
            });

          }

        })
          .catch(error => {
            setLoading(false);
            // Handle other errors (e.g., network issues)
            console.error("Error during login:", error);

            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
            //navigate("/home");
          })


      }


  }
  return (

    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <ArgonBox onChange={(e) => handleInputChange(e)}>
        <ArgonBox mb={2}>
          <ArgonInput type="text" name="username" placeholder="Username" size="large" />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="password" name="password" placeholder="Password" size="large" />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonTypography>
            <CaptchaComponent />
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="text" name="captcha" placeholder="Captcha" size="large" />
        </ArgonBox>
        <ArgonBox display="flex" alignItems="center">
          <Switch name="rememberme" checked={rememberMe} onChange={handleSetRememberMe} />
          <ArgonTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mt={4} mb={1}>
          <ArgonButton color="info" size="large"
            onClick={login} disabled={loading} fullWidth>
            {loading ? <CircularProgress color="inherit" size={24} /> : "Login"}
          </ArgonButton>
        </ArgonBox>
        <ArgonBox mt={3} textAlign="center">
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <ArgonTypography
              component={Link}
              to="/authentication/sign-up/illustration"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              Sign up
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
