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
import Grid from "@mui/material/Grid";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";

// Settings page components
import BaseLayout from "layouts/account/components/BaseLayout";


import Room from "layouts/pages/users/room-form/components/Room";


import getinfo_user from "components/API_GetInfo";
import { useEffect, useState } from "react";
function Settings() {
  const [data_user, setdata_user] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await getinfo_user();
        setdata_user(userInfo);
      } catch (error) {
        // Handle errors
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once
  if (data_user) {
    return (
      <BaseLayout>
        <ArgonBox mt={4}>
          <Grid container spacing={3}>
            
            <Grid item xs={12} lg={18}>
              <ArgonBox mb={3}>
                <Grid container spacing={3}>
                
                  <Grid item xs={12}>
                    <Room />
                  </Grid>
           
                </Grid>
              </ArgonBox>
            </Grid>
          </Grid>
        </ArgonBox>
      </BaseLayout>
    );
  }
}
export default Settings;
