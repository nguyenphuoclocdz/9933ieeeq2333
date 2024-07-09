/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import CircularProgress from '@mui/material/CircularProgress';
// Data
//import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import { useState, useEffect } from "react";
import axios from "axios";

function DataTables() {
  const [loading, setLoading] = useState(true);
  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "20%" },
      { Header: "fullname", accessor: "fullname", width: "25%" },
      { Header: "email", accessor: "email" },
      { Header: "username", accessor: "username", width: "7%" },
      { Header: "phone", accessor: "phone",},
      { Header: "domicile", accessor: "domicile",}
    ],
    rows: [],
  });

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
  const fetchData = async () => {

    try {
      setLoading(true);
      const response = await api.get("/api/user");
      const userData = response.data.data;

      const formattedData = userData.map(user => ({
        id: user.userId,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        phone: user.phone,
        domicile: user.domicile
      }));

      setDataTableData(prevState => ({ ...prevState, rows: formattedData }));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox pt={6} pb={3}>
        <Card>
          <ArgonBox p={3} lineHeight={1}>
            <ArgonTypography variant="h5" fontWeight="medium">
              Datatable Search
            </ArgonTypography>
            <ArgonTypography variant="button" fontWeight="regular" color="text">
              A lightweight, extendable, dependency-free javascript HTML table plugin.
            </ArgonTypography>
          </ArgonBox>
          {loading ? (
            <ArgonBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100px" // Adjust as needed
            >
              <CircularProgress color="inherit" size={40} />
            </ArgonBox>
          ) : (
            <DataTable table={dataTableData} canSearch />
          )}
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
