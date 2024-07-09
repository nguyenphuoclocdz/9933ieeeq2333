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
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonBadgeDot from "components/ArgonBadgeDot";
import ArgonButton from "components/ArgonButton";
import ArgonTypography from "components/ArgonTypography";

// Viện Dưỡng Lão An Nghỉ MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultStatisticsCard from "examples/Cards/StatisticsCards/DefaultStatisticsCard";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import SalesTable from "examples/Tables/SalesTable";
import DataTable from "examples/Tables/DataTable";

// Overview page components
import ChannelsChart from "layouts/statistical/overview/components/ChannelsChart";

// Data
import horizontalBarChartData from "layouts/statistical/overview/data/horizontalBarChartData";
import salesTableData from "layouts/statistical/overview/data/salesTableData";
import dataTableData from "layouts/statistical/overview/data/dataTableData";
import getRequest from "components/API_Get";
import numeral from "numeral";

function Overview() {
  // DefaultStatisticsCard state for the dropdown value
  const [salesDropdownValue, setSalesDropdownValue] = useState("6 May - 7 May");
  const [customersDropdownValue, setCustomersDropdownValue] = useState("6 May - 7 May");
  const [revenueDropdownValue, setRevenueDropdownValue] = useState("6 May - 7 May");

  // DefaultStatisticsCard state for the dropdown action
  const [salesDropdown, setSalesDropdown] = useState(null);
  const [customersDropdown, setCustomersDropdown] = useState(null);
  const [revenueDropdown, setRevenueDropdown] = useState(null);

  // DefaultStatisticsCard handler for the dropdown action
  const openSalesDropdown = ({ currentTarget }) => setSalesDropdown(currentTarget);
  const closeSalesDropdown = ({ currentTarget }) => {
    setSalesDropdown(null);
    setSalesDropdownValue(currentTarget.innerText || salesDropdownValue);
  };
  const openCustomersDropdown = ({ currentTarget }) => setCustomersDropdown(currentTarget);
  const closeCustomersDropdown = ({ currentTarget }) => {
    setCustomersDropdown(null);
    setCustomersDropdownValue(currentTarget.innerText || salesDropdownValue);
  };
  const openRevenueDropdown = ({ currentTarget }) => setRevenueDropdown(currentTarget);
  const closeRevenueDropdown = ({ currentTarget }) => {
    setRevenueDropdown(null);
    setRevenueDropdownValue(currentTarget.innerText || salesDropdownValue);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [data, setData] = useState({});
  const [defaultLineChartData, setdefaultLineChartData] = useState({});
  const [channelsChartData, setchannelsChartData] = useState({});
  const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const fetchData = async () => {
    getRequest("/api/statistical", (response) => {
      if (response.status === "success") {
        setData(response);
        const sortedEntries = Object.entries(response.revenue).sort(([a], [b]) => a.localeCompare(b));
        const labels = sortedEntries.map(([month]) => monthAbbreviations[parseInt(month.substring(5)) - 1]);
        const revenueValues = sortedEntries.map(([, revenue]) => revenue);

        const newChartData = {
          labels: labels,
          datasets: [
            {
              label: "Revenue from services",
              color: "info",
              data: revenueValues,
            },
          ],
        };
        const channelsChartData = {
          labels: ["Empty room", "Inhabited room"],
          datasets: {
            label: "Fill rate",
            backgroundColors: ["info", "dark"],
            data: [response.totalElderly, (response.totalRoom - response.totalElderly)],
          },
        };
        setdefaultLineChartData(newChartData);
        setchannelsChartData(channelsChartData)
      } else {
        // Handle unsuccessful response if needed
      }
    });
  };



  // Dropdown menu template for the DefaultStatisticsCard
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
      disableAutoFocusItem
    >
      <MenuItem onClick={close}>Last 7 days</MenuItem>
      <MenuItem onClick={close}>Last week</MenuItem>
      <MenuItem onClick={close}>Last 30 days</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="Revenue this month"
                count={numeral(data.revenue_thisMonth).format('0,0') + " VNĐ"}
                percentage={{
                  color: "success",
                  value: "+" + (data.increase_revenue) + "%",
                  label: "previous revenue",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="New Elderly This Month"
                count={data.newElderly_thisMonth}
                percentage={{
                  color: "success",
                  value: "+" + (data.newElderly_thisMonth / data.totalElderly * 100).toFixed(2) + "%",
                  label: "elderly on total",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="Total Elderly / Room"
                count={data.totalElderly + "/" + data.totalRoom}
                percentage={{
                  color: "success",
                  value: (data.totalElderly / data.totalRoom * 100).toFixed(2) + "%",
                  label: "fill rate",
                }}
              />
            </Grid>


          </Grid>
        </ArgonBox>
        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <ChannelsChart data={channelsChartData} />
            </Grid>
            <Grid item xs={12} sm={6} lg={8}>
              <DefaultLineChart
                title="Revenue"
                description={
                  <ArgonBox display="flex" justifyContent="space-between">
                    <ArgonBox display="flex" ml={-1}>
                      <ArgonBadgeDot color="info" size="sm" badgeContent="Revenue from service packages and incurred costs" />
                    </ArgonBox>
                    <ArgonBox mt={-5.25} mr={-1}>
                      <Tooltip title="See which ads perform better" placement="left" arrow>
                        <ArgonButton
                          variant="outlined"
                          color="secondary"
                          size="small"
                          circular
                          iconOnly
                        >
                          <Icon>priority_high</Icon>
                        </ArgonButton>
                      </Tooltip>
                    </ArgonBox>
                  </ArgonBox>
                }
                chart={defaultLineChartData}
              />
            </Grid>
          </Grid>
        </ArgonBox>

      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
