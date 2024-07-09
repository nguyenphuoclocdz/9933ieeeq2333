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
import DataTablemedicine from "examples/Tables/DataTable/indexMedicine";
import importFile from "components/ImportFile/ImportUser";
import ExportFileMedicine from "components/exportFile/exportMedicine";
import imporMedicineFile from "components/ImportFile/importMedicine";
import { validatePrice } from "components/Validate/ValidateFunctions";
import { validateString } from "components/Validate/ValidateFunctions";
import FormField from "components/Validate/FormField";


function DataTables() {
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const column = [
    { Header: "medicine", accessor: "drugName" },
    { Header: "form", accessor: "form" },
    { Header: "quantity", accessor: "quantity" },
    { Header: "expiryDate", accessor: "expiryDate" },
    { Header: "sideEffects", accessor: "sideEffects" },
    { Header: "indications", accessor: "indications" },
    { Header: "contraindications", accessor: "contraindications" },
    { Header: "price", accessor: "price" },
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
    drugName: "",
    form: "",
    quantity: 0,
    expiryDate: "",
    sideEffects: "",
    indications: "",
    contraindications: "",
    price: 0,
  });

  const resetValue = () => {
    setValues({
      drugName: "",
      form: "",
      quantity: 0,
      expiryDate: "",
      sideEffects: "",
      indications: "",
      contraindications: "",
      price: 0,
    });

    setInputErrors({
      drugName: false,
      form: false,
      quantity: false,
      expiryDate: false,
      sideEffects: false,
      indications: false,
      contraindications: false,
      price: false,

    });
    setInputSuccess({
      drugName: false,
      form: false,
      quantity: false,
      expiryDate: false,
      sideEffects: false,
      indications: false,
      contraindications: false,
      price: false,

    });
    setErrorMessage({
      drugName: "",
      form: "",
      quantity: 0,
      expiryDate: "",
      sideEffects: "",
      indications: "",
      contraindications: "",
      price: 0,

    });
  };

  const formatExpiryDate = (datetimeString) => {
    const expiryDateTime = new Date(datetimeString);
    const year = expiryDateTime.getFullYear();
    const month = (expiryDateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = expiryDateTime.getDate().toString().padStart(2, "0");
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
    drugName: false,
    form: false,
    quantity: false,
    expiryDate: false,
    sideEffects: false,
    indications: false,
    contraindications: false,
    price: false,
  });

  const [inputSuccess, setInputSuccess] = useState({
    drugName: false,
    form: false,
    quantity: false,
    expiryDate: false,
    sideEffects: false,
    indications: false,
    contraindications: false,
    price: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    drugName: "",
    form: "",
    quantity: 0,
    expiryDate: "",
    sideEffects: "",
    indications: "",
    contraindications: "",
    price: 0,
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

    if (!validateString(values.drugName)) {
      newErrors.drugName = true;
      errorsFound = true;
      newErrorMessage.drugName = "Please enter valid drugName";
    } else {
      newSuccess.drugName = true;
    }

    if (!validateString(values.form)) {
      newErrors.form = true;
      errorsFound = true;
      newErrorMessage.form = "Please enter valid form";
    } else {
      newSuccess.form = true;
    }

    if (!validatePrice(values.quantity)) {
      newErrors.quantity = true;
      errorsFound = true;
      newErrorMessage.quantity = "Please enter valid quantity";
    } else {
      newSuccess.quantity = true;
    }

    if (!validateDate(values.expiryDate)) {
      errorsFound = true;
      newErrors.expiryDate = true;
      newErrorMessage.expiryDate = "Please select valid expiryDate";
    } else {
      newSuccess.expiryDate = true;
    }

    if (!validateString(values.sideEffects)) {
      newErrors.sideEffects = true;
      errorsFound = true;
      newErrorMessage.sideEffects = "Please enter valid sideEffects";
    } else {
      newSuccess.sideEffects = true;
    }

    if (!validateString(values.indications)) {
      newErrors.indications = true;
      errorsFound = true;
      newErrorMessage.indications = "Please enter valid indications";
    } else {
      newSuccess.indications = true;
    }

    if (!validateString(values.contraindications)) {
      newErrors.contraindications = true;
      errorsFound = true;
      newErrorMessage.contraindications = "Please enter valid contraindications";
    } else {
      newSuccess.contraindications = true;
    }

    if (!validatePrice(values.price)) {
      newErrors.price = true;
      errorsFound = true;
      newErrorMessage.price = "Please enter valid price";
    } else {
      newSuccess.price = true;
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

      getRequest("api/medicine", (response) => {
        if (response.status === "success") {
          const userData = response.data;

          const formattedData = userData.map((user) => {
            const formattedPrice = user.price.toLocaleString();
            const formattedExpiryDate = formatExpiryDate(user.expiryDate);
            return {
              medicineId: user.medicineId,
              drugName: user.drugName,
              form: user.form,
              quantity: user.quantity,
              expiryDate: formattedExpiryDate,
              sideEffects: user.sideEffects,
              indications: user.indications,
              contraindications: user.contraindications,
              price: formattedPrice,
              disableV: user.disable === true ? "true" : "false",
            };
          });

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
    resetValue();
  };
  const handleAdd = () => {
    setAdd(true);
    resetValue();
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
  const addUser = async () => {
    if (!validateForm(values, setInputErrors, setInputSuccess)) {
      const response = await api.post("api/medicine", values).then((response) => {
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
            text: "Not good",
          });
        }
      });
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
                  success={inputSuccess.drugName}
                  errorMessage={errorMessage.drugName}
                  error={inputErrors.drugName}
                  name="drugName"
                  label="drugName"
                  placeholder="drugName"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.form}
                  errorMessage={errorMessage.form}
                  error={inputErrors.form}
                  name="form"
                  label="form"
                  placeholder="form"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.quantity}
                  errorMessage={errorMessage.quantity}
                  error={inputErrors.quantity}
                  name="quantity"
                  label="quantity"
                  placeholder="quantity"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.expiryDate}
                  errorMessage={errorMessage.expiryDate}
                  error={inputErrors.expiryDate}
                  name="expiryDate"
                  label="expiryDate"
                  inputProps={{ type: "date" }}
                  placeholder="expiryDate"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.sideEffects}
                  errorMessage={errorMessage.sideEffects}
                  error={inputErrors.sideEffects}
                  name="sideEffects"
                  label="sideEffects"
                  placeholder="sideEffects"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.indications}
                  errorMessage={errorMessage.indications}
                  error={inputErrors.indications}
                  name="indications"
                  label="indications"
                  placeholder="indications"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.contraindications}
                  errorMessage={errorMessage.contraindications}
                  error={inputErrors.contraindications}
                  name="contraindications"
                  label="contraindications"
                  placeholder="contraindications"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.price}
                  errorMessage={errorMessage.price}
                  error={inputErrors.price}
                  name="price"
                  label="price"
                  placeholder="price"
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
                Medicine DataTable
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
                onClick={() => imporMedicineFile(fetchData)}
              >
                Import
              </ArgonButton>
              <ArgonButton
                variant="outlined"
                color="info"
                size="small"
                onClick={ExportFileMedicine}
              >
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
            <DataTablemedicine table={dataTableData} canSearch onDeleteRow={fetchData} />
          )}
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
