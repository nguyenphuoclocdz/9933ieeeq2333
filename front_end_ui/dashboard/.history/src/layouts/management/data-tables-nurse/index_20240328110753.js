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

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
// Viện Dưỡng Lão An Nghỉ MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import CircularProgress from '@mui/material/CircularProgress';
// Data
//import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import { useState, useEffect } from "react";
import getRequest from "components/API_Get";

function DataTables() {
  const [loading, setLoading] = useState(true);
  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "10%" },
      { Header: "fullname", accessor: "fullname", width: "15%" },
      { Header: "email", accessor: "email" },
      { Header: "username", accessor: "username", width: "7%" },
      { Header: "phone", accessor: "phone", },
      { Header: "domicile", accessor: "domicile", },
      { Header: "update", accessor: "update", },
      { Header: "delete", accessor: "delete", }
    ],
    rows: [],
  });

  const fetchData = async () => {

    try {
      setLoading(true);


      getRequest("/api/nurse", (response) => {
        if (response.status === "success") {
          const userData = response.data;
          const formattedData = userData.map(user => ({
            id: user.userId,
            fullname: user.fullname,
            email: user.email,
            username: user.username,
            phone: user.phone,
            domicile: user.domicile
          }));
          setDataTableData(prevState => ({ ...prevState, rows: formattedData }));
        } else {
          Swal_show('error', 'An error occurred, please log in again!');
          reject({ status: 'error', message: 'An error occurred, please log in again!' });

        }
      });
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
