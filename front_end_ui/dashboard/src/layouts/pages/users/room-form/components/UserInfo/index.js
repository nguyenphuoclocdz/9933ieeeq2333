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

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// NewUser page components
import FormField from "layouts/pages/users/room-form/components/FormField";
//import FormField from "layouts/pages/users/room-form/components/FormField";

function UserInfo({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { roomName, bedName,status } = formField;

  const {
    roomName: roomNameV,
    bedName: bedNameV,
    status: statusV,
  } = values;

  return (
    <ArgonBox>
      <ArgonBox lineHeight={0}>
        <ArgonTypography variant="h5" fontWeight="bold">
          Room form
        </ArgonTypography>
        <ArgonTypography variant="button" fontWeight="regular" color="text">
          Room informations
        </ArgonTypography>
      </ArgonBox>
      <ArgonBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={roomName.type}
              label={roomName.label}
              name={roomName.name}
              value={roomNameV}
              placeholder={roomName.placeholder}
              error={errors.roomName && touched.roomName}
              success={roomNameV.length > 0 && !errors.roomName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={bedName.type}
              label={bedName.label}
              name={bedName.name}
              value={bedNameV}
              placeholder={bedName.placeholder}
              error={errors.bedName && touched.bedName}
              success={bedNameV.length > 0 && !errors.bedName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={status.type}
              label={status.label}
              name={status.name}
              value={statusV}
              placeholder={status.placeholder}
              error={errors.status && touched.status}
              success={statusV.length > 0 && !errors.status}
            />
          </Grid>
        </Grid>
      </ArgonBox>
    </ArgonBox>
  );
}

// typechecking props for UserInfo
UserInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default UserInfo;
