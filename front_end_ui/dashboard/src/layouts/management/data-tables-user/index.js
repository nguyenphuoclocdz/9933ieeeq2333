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
import DataTableNurse from "examples/Tables/DataTable/indexUser";
import importFile from "components/ImportFile/ImportUser";
import ExportFileRole4 from "components/exportFile/exportRole4";
import FormField from "components/Validate/FormField";

//Validation component
import { validFullName } from "components/Validate/ValidateFunctions";
import { validateUsername } from "components/Validate/ValidateFunctions";
import { validEmail } from "components/Validate/ValidateFunctions";
import { validatePassword } from "components/Validate/ValidateFunctions";
import { validPhoneNumber } from "components/Validate/ValidateFunctions";
import { validateString } from "components/Validate/ValidateFunctions";

function DataTables() {
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const column = [
    { Header: "id", accessor: "id", width: "10%" },
    { Header: "fullname", accessor: "fullname", width: "10%" },
    { Header: "email", accessor: "email" },
    { Header: "username", accessor: "username", width: "7%" },
    { Header: "phone", accessor: "phone" },
    { Header: "domicile", accessor: "domicile" },
    { Header: "action", accessor: "actionCell" },
  ];
  if (role == 1) {
    column.splice(5, 0, { Header: "disable", accessor: "disableV" });
  }

  const [dataTableData, setDataTableData] = useState({
    columns: column,
    rows: [],
  });

  const [values, setValues] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    domicile: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);

      getRequest("/api/user", (response) => {
        if (response.status === "success") {
          const userData = response.data;
          const formattedData = userData.map((user) => ({
            id: user.userId,
            fullname: user.fullname,
            email: user.email,
            username: user.username,
            phone: user.phone,
            domicile: user.domicile,
            disableV: user.disable === true ? "true" : "false",
          }));
          setDataTableData((prevState) => ({ ...prevState, rows: formattedData }));
        } else {
          Swal_show("error", "Error, please login again!");
          reject({ status: "error", message: "Error, please login again!" });
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
  }, []);

  const handleClose = () => {
    setAdd(false);
  };
  const handleAdd = () => {
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

  // Validation part ********/
  const [inputErrors, setInputErrors] = useState({
    fullname: false,
    username: false,
    password: false,
    email: false,
    phone: false,
    domicile: false,
  });

  const [inputSuccess, setInputSuccess] = useState({
    fullname: false,
    username: false,
    password: false,
    email: false,
    phone: false,
    domicile: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    domicile: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setInputErrors({ ...inputErrors, [name]: false }); // Reset error state when input changes
    setInputSuccess({ ...inputSuccess, [name]: false });
  };

  const handleInputChangeUpdate = (e) => {
    const { name, value } = e.target;
    setValuesUpdate({ ...valuesUpdate, [name]: value });
    setInputErrors({ ...inputErrors, [name]: false }); // Reset error state when input changes
    setInputSuccess({ ...inputSuccess, [name]: false });
  };
  function validateForm(values, setInputErrors, setInputSuccess) {
    let errorsFound = false;
    const newErrors = {};
    const newSuccess = {};
    const newErrorMessage = {};

    if (!validFullName(values.fullname)) {
      newErrors.fullname = true;
      errorsFound = true;
      newErrorMessage.fullname = "Full name is not valid";
    } else {
      newSuccess.fullname = true;
    }
    if (!validateUsername(values.username)) {
      newErrors.username = true;
      errorsFound = true;
      newErrorMessage.username = "Username is not valid"
    } else {
      newSuccess.username = true;
    }
    if (!validEmail(values.email)) {
      newErrors.email = true;
      errorsFound = true;
      newErrorMessage.email = "Email is not valid";
    } else {
      newSuccess.email = true;
    }
    if (!validPhoneNumber(values.phone)) {
      newErrors.phone = true;
      errorsFound = true;
      newErrorMessage.phone = "phone number is not invalid(phone number must be start with +84, 84, 0)"
    } else {
      newSuccess.phone = true;
    }
    if (!validatePassword(values.password)) {
      newErrors.password = true;
      errorsFound = true;
      newErrorMessage.password = "more than 8 characters (at least 1 lowercase, 1 uppercase, 1 special character and 1 digit)"
    } else {
      newSuccess.password = true;
    }
    if (!validateString(values.domicile)) {
      newErrors.domicile = true;
      errorsFound = true;
      newErrorMessage.domicile = "Domicile is not valid";
    } else {
      newSuccess.domicile = true;
    }

    setInputSuccess({ ...inputSuccess, ...newSuccess });
    setInputErrors({ ...inputErrors, ...newErrors });
    setErrorMessage({ ...errorMessage, ...newErrorMessage });

    return errorsFound;
  }

  const resetValue = () => {
    setValues({
      fullname: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      domicile: "",
    });
    setInputErrors({
      description: false,
      title: false,
    });
    setInputSuccess({
      description: false,
      title: false,
    });
    setErrorMessage({
      description: "",
      title: "",
    });
  };

  // Validation part ********/

  const addUser = async () => {
    const response = await api.post("api/user", values).then((response) => {
      console.log(response);
      if (response.data.status == "success") {
        Swal.fire({
          icon: "success",
          title: "Nice!",
          text: "Add successfully",
        });
        fetchData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Something wrong!",
          text: "not good",
        });
      }
    });
  };

  return (
    <DashboardLayout>
      <Dialog open={add}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <ArgonBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="Fullname"
                  placeholder="Tommy Thompson's"
                  onChange={(e) => setValues({ ...values, fullname: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  label="Email"
                  placeholder="example@email.com"
                  inputProps={{ type: "email" }}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  label="User name"
                  placeholder="Your username"
                  onChange={(e) => setValues({ ...values, username: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  inputProps={{ type: "email" }}
                  label="Password"
                  placeholder="Password"
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="Phone number"
                  placeholder="+84 735 631 620"
                  inputProps={{ type: "number" }}
                  onChange={(e) => setValues({ ...values, phone: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormField
                  label="Domicile"
                  placeholder="Can Tho"
                  onChange={(e) => setValues({ ...values, domicile: e.target.value })}
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
                User DataTable
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
              <ArgonButton
                variant="outlined"
                color="info"
                size="small"
                onClick={() => importFile(fetchData)}
              >
                Import
              </ArgonButton>
              <ArgonButton variant="outlined" color="info" size="small" onClick={ExportFileRole4}>
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
            <DataTableNurse table={dataTableData} canSearch onDeleteRow={fetchData} />
          )}
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
