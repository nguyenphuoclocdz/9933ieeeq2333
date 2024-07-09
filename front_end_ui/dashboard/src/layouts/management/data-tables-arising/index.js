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
  Stack,
} from "@mui/material";
import ArgonButton from "components/ArgonButton";
import axios from "axios";
import Swal_show from "components/Swal";
import Swal from "sweetalert2";
import DataTableArising from "examples/Tables/DataTable/indexArising";
import ExportFileArising from "components/exportFile/exportArising";
import imporArisingFile from "components/ImportFile/importServiceArising";
import ArgonSelect from "components/ArgonSelect";
import { validatePrice } from "components/Validate/ValidateFunctions";
import { validateString } from "components/Validate/ValidateFunctions";
import FormField from "components/Validate/FormField";
import ArgonBadge from "components/ArgonBadge";

function DataTables() {
  const awaiting = (
    <ArgonBadge
      variant="contained"
      color="warning"
      size="xs"
      badgeContent="awaiting"
      container
      values="carnivore"
    />
  );
  const unpaid = (
    <ArgonBadge
      variant="contained"
      color="infor"
      size="xs"
      badgeContent="unpaid"
      container
      values="vegan"
    />
  );

  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [elderlyValue, setElderlyValue] = useState([]);
  const [add, setAdd] = useState(false);
  const column = [
    { Header: "servicesArisingId", accessor: "servicesArisingId" },
    { Header: "elderlyId", accessor: "elderlyId" },
    { Header: "service", accessor: "service" },
    { Header: "price", accessor: "money" },
    { Header: "time", accessor: "time" },
    { Header: "status", accessor: "status" },
    { Header: "action", accessor: "actionCell" },
  ];
  const [dataTableData, setDataTableData] = useState({
    columns: column,
    rows: [],
  });

  const [values, setValues] = useState({
    servicesArisingId: "",
    elderlyId: "",
    service: "",
    money: "",
    time: "",
    status: "",
  });

  const resetValue = () => {
    fetchElderlyOptions();
    setValues({
      servicesArisingId: "",
      elderlyId: elderlyValue.length > 0 ? elderlyValue[0].value : null,
      service: "",
      money: "",
      time: "",
      status: "",
    });
    setInputErrors({
      service: false,
      money: false,
      time: false,
      elderlyId: false,
    });
    setInputSuccess({
      service: false,
      money: false,
      time: false,
      elderlyId: false,
    });
    setErrorMessage({
      service: "",
      money: "",
      time: "",
      elderlyId: "",
    });
  };
  const formatTimeArising = (datetimeString) => {
    const timeArising = new Date(datetimeString);
    const year = timeArising.getFullYear();
    const month = (timeArising.getMonth() + 1).toString().padStart(2, "0");
    const day = timeArising.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // Validation part ********/
  function validateDate(date) {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    if (isNaN(selectedDate)) {
      return false;
    }

    if (selectedDate >= currentDate) {
      return true;
    } else {
      return false;
    }
  }
  const [inputErrors, setInputErrors] = useState({
    service: false,
    money: false,
    time: false,
    elderlyId: false,
  });

  const [inputSuccess, setInputSuccess] = useState({
    service: false,
    money: false,
    time: false,
    elderlyId: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    service: "",
    money: "",
    time: "",
    elderlyId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setInputErrors({ ...inputErrors, [name]: false });
    setInputSuccess({ ...inputSuccess, [name]: false });
  };

  function validateForm(values, setInputErrors, setInputSuccess) {
    let errorsFound = false;
    const newErrors = {};
    const newSuccess = {};
    const newErrorMessage = {};
    if (!validatePrice(values.money)) {
      newErrors.money = true;
      errorsFound = true;
      newErrorMessage.money = "Please enter valid number";
    } else {
      newSuccess.money = true;
    }
    if (!validateString(values.service)) {
      newErrors.service = true;
      errorsFound = true;
      newErrorMessage.service = "Please enter valid string";
    } else {
      newSuccess.service = true;
    }
    if (!validateDate(values.time)) {
      errorsFound = true;
      newErrors.time = true;
      newErrorMessage.time = "Please select valid date";
    } else {
      newSuccess.time = true;
    }
    if (values.elderlyId === "") {
      errorsFound = true;
      newErrors.elderlyId = true;
      newErrorMessage.elderlyId = "Please select 1 elderly";
    } else {
      newSuccess.elderlyId = true;
    }

    setInputSuccess({ ...inputSuccess, ...newSuccess });
    setInputErrors({ ...inputErrors, ...newErrors });
    setErrorMessage({ ...errorMessage, ...newErrorMessage });
    return errorsFound;
  }

  // Validation part ********/

  const fetchData = async () => {
    try {
      setLoading(true);
      getRequest("/api/arising", (response) => {
        console.log(response);
        if (response.status === "success") {
          console.log(response.data);
          const userData = response.data;
          const formattedData = userData.map((user) => {
            const formattedTime = formatTimeArising(user.time);
            const formattedPrice = user.money.toLocaleString();
            return {
              servicesArisingId: user.servicesArisingId,
              elderlyId: user.elderlyId,
              service: user.service,
              money: formattedPrice,
              time: formattedTime,
              status: user.status ? awaiting : unpaid,
            };
          });
          setDataTableData((prevState) => ({ ...prevState, rows: formattedData }));
        } else {
          console.log("response fail");
          Swal_show("error", "Error, please login again!");
          // reject({ status: "error", message: "Error, please login again!" });
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchElderlyOptions();
  }, []);

  const handleClose = () => {
    resetValue();
    setAdd(false);
  };
  const handleAdd = () => {
    resetValue();
    setAdd(true);
  };
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
  const fetchElderlyOptions = async () => {
    getRequest("/api/room/getAllRoomElderly", (response) => {
      if (response.status === "success") {
        const formattedData2 = response.room.map((item) => ({
          value: item.elderlyId,
          label: `${item.fullNameElderly} - ${item.room}`,
        }));

        setElderlyValue(formattedData2);
      } else {
        console.error("Error fetching data:", response.message);
      }
    });
  };
  const addUser = async () => {
  console.log("sucess", inputSuccess)
    if (!validateForm(values, setInputErrors, setInputSuccess)) {
      const response = await api.post("api/arising", values).then((response) => {
        console.log(response.data);
        if (response.data.status == "success") {
          Swal.fire({
            icon: "success",
            title: "Nice!",
            text: "Add successfully",
          });
          handleClose();
          fetchData();
          resetValue();
        } else {
          Swal.fire({
            icon: "error",
            title: "Something wrong!",
            text: "not good",
          });
        }
      });
    }
  };

  return (
    <DashboardLayout>
      <Dialog open={add} fullWidth maxWidth="md">
        <DialogTitle>Add</DialogTitle>
        <DialogContent>
          <ArgonBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <ArgonBox display="flex" flexDirection="column" height="100%">
                  <ArgonBox mb={1}>
                    <ArgonTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      Elderly
                    </ArgonTypography>
                  </ArgonBox>
                  <ArgonBox>
                    <ArgonSelect
                      error={errorMessage.elderlyId}
                      success={inputSuccess.elderlyId}
                      defaultValue={elderlyValue.length > 0 ? elderlyValue[0] : null}
                      options={elderlyValue}
                      onChange={(selectedOption) =>
                        handleInputChange({
                          target: {
                            name: "elderlyId",
                            value: selectedOption.value,
                          },
                        })
                      }
                    />
                  </ArgonBox>
                  {errorMessage.elderlyId && (
                    <ArgonBox mt={0.75}>
                      <ArgonTypography component="div" variant="caption" color="error">
                        {errorMessage.elderlyId}
                      </ArgonTypography>
                    </ArgonBox>
                  )}
                </ArgonBox>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.service}
                  errorMessage={errorMessage.service}
                  error={inputErrors.service}
                  name="service"
                  label="service"
                  placeholder="service"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.money}
                  errorMessage={errorMessage.money}
                  error={inputErrors.money}
                  name="money"
                  label="Money"
                  placeholder="money"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.time}
                  errorMessage={errorMessage.time}
                  error={inputErrors.time}
                  name="time"
                  label="Time"
                  inputProps={{ type: "date" }}
                  placeholder="time"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} md={12}></Grid>
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
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonBox lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                Arising DataTable
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
              <ArgonButton variant="gradient" color="info" size="small" onClick={handleAdd}>
                + New
              </ArgonButton>

              <ArgonButton
                variant="outlined"
                color="info"
                size="small"
                onClick={() => imporArisingFile(fetchData)}
              >
                Import
              </ArgonButton>
              <ArgonButton variant="outlined" color="info" size="small" onClick={ExportFileArising}>
                Export
              </ArgonButton>
            </Stack>
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
            <DataTableArising table={dataTableData} canSearch onDeleteRow={fetchData} />
          )}
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
