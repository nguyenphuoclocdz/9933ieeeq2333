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

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";

// Images
import burceMars from "assets/images/bruce-mars.jpg";



//custom
import Cookies from "js-cookie";
import postRequest from "components/API_Custom";
import Swal_show from "components/Swal";

function Header(data_user) {

  const [visible, setVisible] = useState(true);

  const handleSetVisible = () => setVisible(!visible);


  return (
    <Card id="profile">
      <ArgonBox p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <ArgonAvatar
              src={data_user.data_user.image}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <ArgonBox height="100%" mt={0.5} lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                {data_user.data_user.fullname}
              </ArgonTypography>
              <ArgonTypography variant="button" color="text" fontWeight="medium">
                {data_user.data_user.role_name}
              </ArgonTypography>
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
            <ArgonBox
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
            >
              <ArgonTypography variant="caption" fontWeight="regular">
                Switch to {visible ? "invisible" : "visible"}
              </ArgonTypography>
              <ArgonBox mx={1}>
                <Switch checked={visible} onChange={handleSetVisible} />
              </ArgonBox>
            </ArgonBox>
          </Grid>
        </Grid>
      </ArgonBox>
    </Card>
  );
}

export default Header;
