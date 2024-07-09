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

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Viện Dưỡng Lão An Nghỉ MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import WeatherCard from "examples/Cards/WeatherCard";
import DefaultCounterCard from "examples/Cards/CounterCards/DefaultCounterCard";
import ReportsDoughnutChart from "examples/Charts/DoughnutCharts/ReportsDoughnutChart";
import ThinBarChart from "examples/Charts/BarCharts/ThinBarChart";
import ControllerCard from "examples/Cards/ControllerCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// SmartHome dashboard components
import Cameras from "layouts/dashboards/smart-home/components/Cameras";
import TemperatureSlider from "layouts/dashboards/smart-home/components/TemperatureSlider";

// Data
import reportsDoughnutChartData from "layouts/dashboards/smart-home/data/reportsDoughnutChartData";
import thinBarChartData from "layouts/dashboards/smart-home/data/thinBarChartData";
import controllerCardIcons from "layouts/dashboards/smart-home/data/controllerCardIcons";

// Images
import iconSunCloud from "assets/images/small-logos/icon-sun-cloud.png";

//custom
import React, { useEffect } from 'react';
import axios from 'axios';


function SmartHome() {
  const [temperature, setTemperature] = useState(21);
  const {
    humidityIconLight,
    temperatureIconLight,
    airConditionerIconLight,
    lightsIconLight,
    wifiIconLight,
    humidityIconDark,
    airConditionerIconDark,
    lightsIconDark,
    wifiIconDark,
  } = controllerCardIcons;

  // Controller cards states
  const [humidityState, setHumidityState] = useState(false);
  const [temperatureState, setTemperatureState] = useState(true);
  const [airConditionerState, setAirConditionerState] = useState(false);
  const [lightsStata, setLightsStata] = useState(false);
  const [wifiState, setWifiState] = useState(true);




  //custom

  const [temperaturee, setTemperaturee] = useState(null);
  const [statusweather, setStatusweather] = useState(null);
  const [namelocation, setNamelocation] = useState(null);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const getTemperaturee = async () => {
      try {
        const apiKey = 'd20cbe2a2d32e29be433b9353c998ecf';
        const city = 'Can Tho';
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        console.log(response.data);
        setTemperaturee(response.data.main.temp);
        setStatusweather(response.data.weather[0].main);
        setNamelocation(response.data.name);
      } catch (error) {
        setError('Error fetching temperature');
      } finally {

      }
    };

    getTemperaturee();
  }, []);






  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox pt={3}>
        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} xl={7}>
              <Cameras />
            </Grid>
            <Grid item xs={12} xl={5}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <WeatherCard
                    color="white"
                    title="weather today"
                    weather={{ location: namelocation, degree: temperaturee }}
                    icon={{ component: iconSunCloud, text: statusweather }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DefaultCounterCard
                    count={21}
                    suffix={<>&deg;C</>}
                    title="living room"
                    description="temperature"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DefaultCounterCard
                    count={44}
                    suffix="%"
                    title="outside"
                    description="humidity"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DefaultCounterCard
                    count={87}
                    suffix="m³"
                    title="water"
                    description="consumption"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DefaultCounterCard
                    count={417}
                    suffix="GB"
                    title="internet"
                    description="all devices"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ArgonBox>

        {role === "1" && (
          <ArgonBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <ReportsDoughnutChart
                  title="Consumption by room"
                  count={{ number: 471.3, text: "whatts" }}
                  chart={reportsDoughnutChartData}
                  tooltip="See the consumption per room"
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <ThinBarChart title="Consumption per day" chart={thinBarChartData} />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <TemperatureSlider
                  handle1={{
                    value: temperature,
                    onChange: (v) => setTemperature(Math.round(v)),
                  }}
                  title="Device limit"
                  current={
                    <>
                      {temperature}
                      <ArgonTypography component="span" variant="h4" color="text">
                        &deg;C
                      </ArgonTypography>
                    </>
                  }
                  label="temperature"
                  start={<>-10&deg;C</>}
                  end={<>200&deg;C</>}
                  minValue={-10}
                  maxValue={200}
                />
              </Grid>
            </Grid>
          </ArgonBox>
        )}
      </ArgonBox>

      <ArgonBox my={6} width="100%">
        <Divider />
      </ArgonBox>
      <ArgonBox mb={3}>
        {role === "1" && (
          <Grid container spacing={3}>

            <Grid item xs={12} sm={6} lg={2}>
              <ControllerCard
                color="dark"
                state={temperatureState}
                icon={temperatureIconLight}
                title="temperature"
                description="Active"
                onChange={() => setTemperatureState(!temperatureState)}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <ControllerCard
                color="dark"
                state={airConditionerState}
                icon={airConditionerState ? airConditionerIconLight : airConditionerIconDark}
                title="air conditioner"
                description="Inactive since: 1 hour"
                onChange={() => setAirConditionerState(!airConditionerState)}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <ControllerCard
                color="dark"
                state={lightsStata}
                icon={lightsStata ? lightsIconLight : lightsIconDark}
                title="lights"
                description="Inactive since: 27 min"
                onChange={() => setLightsStata(!lightsStata)}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <ControllerCard
                color="dark"
                state={wifiState}
                icon={wifiState ? wifiIconLight : wifiIconDark}
                title="wi-fi"
                description="active"
                onChange={() => setWifiState(!wifiState)}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <PlaceholderCard title={{ variant: "h5", text: "New device" }} />
            </Grid>
          </Grid>)}
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SmartHome;
