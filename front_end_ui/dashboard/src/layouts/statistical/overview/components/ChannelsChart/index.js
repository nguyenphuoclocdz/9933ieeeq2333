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
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import ArgonBadgeDot from "components/ArgonBadgeDot";
import PieChart from "examples/Charts/PieChart";
import PropTypes from 'prop-types';


function ChannelsChart({ data }) {
  return (
    <Card sx={{ overflow: "visible" }}>
      <ArgonBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <ArgonTypography variant="h6">Fill rate</ArgonTypography>
        <Tooltip title="See traffic channels" placement="bottom" arrow>
          <ArgonButton variant="outlined" color="secondary" size="small" circular iconOnly>
            <Icon>priority_high</Icon>
          </ArgonButton>
        </Tooltip>
      </ArgonBox>
      <ArgonBox p={2} mt={3}>
        <Grid container alignItems="center">
          <Grid item xs={7}>
            <PieChart chart={data} height="172px" />
          </Grid>
          <Grid item xs={5}>
            <ArgonBox px={1}>
              <ArgonBox mb={0.5}>
                <ArgonBadgeDot color="info" size="sm" badgeContent="Inhabited" />
              </ArgonBox>
              <ArgonBox mb={0.5}>
                <ArgonBadgeDot color="dark" size="sm" badgeContent="Empty" />
              </ArgonBox>
            </ArgonBox>
          </Grid>
        </Grid>
      </ArgonBox>
    </Card>
  );
}
ChannelsChart.propTypes = {
  data: PropTypes.object.isRequired,
};
export default ChannelsChart;

