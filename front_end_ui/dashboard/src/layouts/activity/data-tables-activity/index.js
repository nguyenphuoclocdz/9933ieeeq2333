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
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
// Viện Dưỡng Lão An Nghỉ MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import CircularProgress from "@mui/material/CircularProgress";
// Data
//import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import { useState, useEffect } from "react";
import getRequest from "components/API_Get";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import FormField from "layouts/account/components/FormField";
import ArgonButton from "components/ArgonButton";
import axios from "axios";
import Swal_show from "components/Swal";
import Swal from "sweetalert2";
import DataTableActivity from "examples/Tables/DataTable/indexActivity";
import postRequest from "components/API_Post";
import { useNavigate } from "react-router-dom";
import ArgonSelect from "components/ArgonSelect";
import DatePicker from "react-flatpickr";
import ArgonDatePicker from "components/ArgonDatePicker";

function DataTables() {
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "activityId", accessor: "activityId" },
      { Header: "title", accessor: "title", width: "10%" },
      { Header: "history", accessor: "history" },
      { Header: "date_create", accessor: "date_create", width: "7%" },
      { Header: "Location", accessor: "elderlyId" },
    ],
    rows: [],
  });

  const [activity, setActivity] = useState({
    title: "",
    history: "",
    date_create: "",
    elderlyId: "",
  });

  const [selectData, setSelectData] = useState({
    elderly: [],
  });

  const [selectedElderly, setSelectedElderly] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      getRequest("/api/activity", (response) => {
        if (response.status === "success") {
          const userData = response.data;
          const formattedData = userData.map((activity) => ({
            activityId: activity.activityId,
            title: activity.title,
            history: activity.history,
            elderlyId: activity.elderlyInfo.fullNameElderly + " - " + activity.elderlyInfo.roomName,
            date_create: new Date(activity.date_create).toLocaleString("en-GB", {
              timeZone: "Asia/Ho_Chi_Minh",
            }),
          }));
          formattedData.sort((a, b) => b.activityId - a.activityId);
          setDataTableData((prevState) => ({ ...prevState, rows: formattedData }));
          setLoading(false);
        }
      });
      getRequest("/api/room/getAllRoomElderly", (response) => {
        if (response.status === "success") {
          const formattedData2 = response.room.map((item) => ({
            value: item.elderlyId,
            label: `${item.fullNameElderly} - ${item.room}`,
          }));
          setSelectData(formattedData2);
          console.log(selectData);
        } else {
          console.error("Error fetching data:", response.message);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    setAdd(false);
  };

  const handleAdd = () => {
    setAdd(true);
  };

  const [values, setValues] = useState({
    title: "",
    date_create: "",
    history: "",
    elderlyId: "",
    infoLocations: "",
  });

  const handleElderlyChange = (selectedOption) => {
    setSelectedElderly(selectedOption);
    setValues({
      ...values,
      elderlyId: selectedOption.value,
    });
  };
  const role = localStorage.getItem("role");
  const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
  });
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const addUser = async () => {
    const response = await api.post("api/activity", values).then((response) => {
      console.log(response);
      if (response.data.status == "success") {
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Nice!",
          text: "Add successfully",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Add failed",
        });
      }
    });
  };
  const renderButtons = () => {
    // Get user role from localStorage
    const role = localStorage.getItem("role");

    // Check if user role is 1 or 5
    if (role === "1" || role === "5") {
      // columns.splice(5, 0, { Header: "", accessor: "update" }),
      // columns.splice(5, 0, { Header: "", accessor: "delete" });
      // If user role is 1 or 5, render buttons
      return (
        <ArgonButton variant="gradient" color="info" size="large" type="button" onClick={handleAdd}>
          Add New
        </ArgonButton>
      );
    } else {
      return null;
    }
  };

  return (
    <DashboardLayout>
      <Dialog open={add}>
        <DialogTitle>Add</DialogTitle>
        <DialogContent>
          <ArgonBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="Title"
                  placeholder="Title"
                  name="title"
                  onChange={(e) => setValues({ ...values, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="history"
                  placeholder="history"
                  name="history"
                  onChange={(e) => setValues({ ...values, history: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <ArgonBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <ArgonTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      Elderly
                    </ArgonTypography>
                  </ArgonBox>
                  <ArgonSelect
                    placeholder="Elderly"
                    options={selectData}
                    onChange={handleElderlyChange}
                  />
                </ArgonBox>
              </Grid>
            </Grid>
          </ArgonBox>
        </DialogContent>
        <DialogActions>
          <ArgonButton
            variant="gradient"
            color="dark"
            size="medium"
            type="submit"
            onClick={addUser}
          >
            Add
          </ArgonButton>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <DashboardNavbar />
      <ArgonBox pt={6} pb={3}>
        <Card>
          <ArgonBox p={3} lineHeight={1}>
            {/* Render buttons based on user role */}
            {renderButtons()}
          </ArgonBox>
          {loading ? (
            <ArgonBox display="flex" justifyContent="center" alignItems="center" minHeight="100px">
              <CircularProgress color="inherit" size={40} />
            </ArgonBox>
          ) : (
            <DataTableActivity table={dataTableData} canSearch onDeleteRow={fetchData} />
          )}
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
