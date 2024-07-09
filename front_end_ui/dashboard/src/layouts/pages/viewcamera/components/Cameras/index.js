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

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Viện Dưỡng Lão An Nghỉ MUI base styles
import breakpoints from "assets/theme/base/breakpoints";

// Viện Dưỡng Lão An Nghỉ MUI example components
import CameraView from "layouts/pages/viewcamera/components/CameraView";
import getRequest from "components/API_Get";

// Images


function Cameras(data) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [openMenu, setOpenMenu] = useState(null);
  const [camera, setCamera] = useState(0);
  const camera1 = data.camera.link;

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.md
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetCamera = (event, newCamera) => setCamera(newCamera);
  const handleOpenMenu = ({ currentTarget }) => setOpenMenu(currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={handleCloseMenu}>Pause</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Stop</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Schedule</MenuItem>
      <ArgonBox
        component="div"
        bgColor="secondary"
        opacity={0.3}
        width="100%"
        height="1px"
        my={1}
      />
      <MenuItem onClick={handleCloseMenu}>
        <ArgonTypography variant="inherit" color="error">
          Remove
        </ArgonTypography>
      </MenuItem>
    </Menu>
  );

  return (
    <Card>
      <ArgonBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <ArgonTypography variant="h6">{data.camera.cameraName}</ArgonTypography>
        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" width="60%">
          <ArgonBox width="90%">
          </ArgonBox>
        </ArgonBox>
      </ArgonBox>
      <ArgonBox p={2} mt={1} width="100%" height="26.25rem">
        <CameraView image={camera1} value={camera} index={0} />
      </ArgonBox>
    </Card>
  );
}

export default Cameras;
