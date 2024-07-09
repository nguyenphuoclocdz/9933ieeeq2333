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
import Cameras from "layouts/pages/viewcamera/components/Cameras";
import TemperatureSlider from "layouts/pages/viewcamera/components/TemperatureSlider";

// Data
import reportsDoughnutChartData from "layouts/pages/viewcamera/data/reportsDoughnutChartData";
import thinBarChartData from "layouts/pages/viewcamera/data/thinBarChartData";
import controllerCardIcons from "layouts/pages/viewcamera/data/controllerCardIcons";

// Images
import iconSunCloud from "assets/images/small-logos/icon-sun-cloud.png";

//custom
import React, { useEffect } from 'react';
import axios from 'axios';
import getRequest from "components/API_Get";


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
  const [cameraData, setCameraData] = useState();
  const fetchData = async () => {
    getRequest("/api/cameras/elderly", (response) => {
      setCameraData(response.data);
    });
  }

  useEffect(() => {
    fetchData();
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
            <Grid container spacing={3}>
              {cameraData && cameraData.map((camera, index) => (
                <Grid key={index} item xs={12} xl={6}>
                  <Cameras camera={camera} />
                </Grid>
              ))}
            </Grid>

          </Grid>
        </ArgonBox>
      </ArgonBox>
      <ArgonBox my={6} width="100%">
        <Divider />
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

export default SmartHome;
