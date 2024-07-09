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
import CircularProgress from "@mui/material/CircularProgress";
// Data
//import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTableElderly from "examples/Tables/DataTable/indexElderly";
import ArgonButton from "components/ArgonButton";
import getRequest from "components/API_Get";
import styles from "examples/Tables/DataTable/ButtonStyles.module.css";
import ArgonBadge from "components/ArgonBadge";
import putRequest from "components/API_Put";
import Swal_show from "components/Swal";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
} from "@mui/material";
import FormField from "layouts/account/components/FormField";
import importElderlyFile from "components/ImportFile/importElderlyFile";
import ExportFileElderly from "components/exportFile/exportElderly";

function DataTables() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "elderlyId", accessor: "elderlyId" },
      { Header: "Relatives", accessor: "relative" },
      { Header: "fullNameElderly", accessor: "fullNameElderly" },
      { Header: "birthdayElderly", accessor: "birthdayElderlyFormatted" },
      { Header: "genderElderly", accessor: "genderElderly" },
      { Header: "serviceName", accessor: "serviceName" },
      { Header: "roomName", accessor: "roomName" },
      { Header: "resident", accessor: "resident" },
      { Header: "domicile", accessor: "domicile" },
      { Header: "status", accessor: "status" },
      { Header: "tools", accessor: "tools" },
      { Header: "timeline", accessor: "timeline" },
      { Header: "medical examination", accessor: "exam" },
      { Header: "view", accessor: "view" },
    ],
    rows: [],
  });

  const [values, setValues] = useState({
    genderElderly: "",
    created_at: "",
    userId: "",
    roomName: "",
    elderlyId: "",
    updated_at: "",
    fullNameElderly: "",
    birthdayElderly: "",
    domicile: "",
    serviceId: "",
    status: "",
    resident: "",
    relative: "",
  });
  const formatBirthdayElderly = (datetimeString) => {
    const expiryDateTime = new Date(datetimeString);
    const year = expiryDateTime.getFullYear();
    const month = (expiryDateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = expiryDateTime.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchData = async () => {
    setLoading(true);
    getRequest("/api/elderly", (response) => {
      const userData = response.data;
      const foramttedData = userData.map((elderly) => {
        const formattedBirthday = formatBirthdayElderly(elderly.birthdayElderly);
        let badgeColor, badgeContent, button, button_timeline;

        // Check the role
        const role = localStorage.getItem("role");
        switch (elderly.status) {
          case 0:
            badgeColor = "warning";
            badgeContent = "Awaiting review";
            // Conditionally render the accept button based on role
            button = (role === "1" || role === "5") && (
              <button
                className={styles.acceptButton}
                onClick={() => acceptButtonClick(elderly.elderlyId)}
              >
                Accept
              </button>
            );
            break;
          case 1:
            badgeColor = "success";
            badgeContent = "Live in";
            button = (
              <button className={styles.updateButton} onClick={() => openUpdate(elderly.elderlyId)}>
                Update
              </button>
            );
            button_timeline = (
              <button
                className={styles.updateButton}
                onClick={() => navigate("/timeline/" + elderly.elderlyId)}
              >
                Timeline
              </button>
            );
            break;
          case 2:
            badgeColor = "primary";
            badgeContent = "No longer living";
            button = null; // No button needed
            button_timeline = null;
            break;
          default: // No button needed
            badgeColor = "default";
            badgeContent = "Unknown status";
            button = null;
            button_timeline = null;
        }

        return {
          elderlyId: elderly.elderlyId,
          relative: elderly.relative,
          fullNameElderly: elderly.fullNameElderly,
          birthdayElderlyFormatted: formattedBirthday,
          genderElderly: elderly.genderElderly,
          serviceName: elderly.namePack,
          roomName: elderly.roomName,
          resident: elderly.resident,
          domicile: elderly.domicile,
          status: (
            <ArgonBadge
              variant="contained"
              color={badgeColor}
              size="xs"
              badgeContent={badgeContent}
              container
            />
          ),
          tools: button,
          timeline: button_timeline,
          exam: elderly.status === 1 ? elderly.status : "",
        };
      });

      setLoading(false);
      setDataTableData((prevState) => ({ ...prevState, rows: foramttedData }));
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const acceptButtonClick = (elderlyId) => {
    putRequest(
      "/api/elderly/accept/" + elderlyId,
      {
        status: 1,
      },
      (response) => {
        console.log(response);
        if (response.status === "success") {
          Swal_show("success", "Elderly accept successfully");
          fetchData();
        } else {
          Swal_show("success", response.message);
        }
      }
    );
  };

  const updateButtonClick = (elderlyId) => {
    alert(elderlyId);
  };

  const [on, setOn] = useState(false);
  const openUpdate = (elderlyId) => {
    getRequest("/api/elderly/" + elderlyId, (response) => {
      if (response.status === "success") {
        setValues(response.data);
        setOn(true);
      } else {
        Swal_show("success", response.message);
      }
    });
  };
  const handleClose = () => {
    setOn(false);
  };

  return (
    <DashboardLayout>
      <Dialog open={on}>
        <DialogTitle className={styles.btnTitle}>Update</DialogTitle>
        <DialogContent>
          <ArgonBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="fullNameElderly"
                  value={values.fullNameElderly}
                  placeholder="Thompson"
                  onChange={(e) => setValues({ ...values, fullNameElderly: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  label="genderElderly"
                  placeholder="genderElderly"
                  value={values.genderElderly}
                  onChange={(e) => setValues({ ...values, genderElderly: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  label="relative"
                  placeholder="relative"
                  value={values.relative}
                  onChange={(e) => setValues({ ...values, relative: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  label="domicile"
                  placeholder="domicile"
                  value={values.domicile}
                  onChange={(e) => setValues({ ...values, domicile: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  label="created_at"
                  placeholder="created_at"
                  value={values.created_at}
                  onChange={(e) => setValues({ ...values, created_at: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  label="birthdayElderly"
                  placeholder="birthdayElderly"
                  value={values.birthdayElderly}
                  onChange={(e) => setValues({ ...values, birthdayElderly: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  label="resident"
                  placeholder="resident"
                  value={values.resident}
                  onChange={(e) => setValues({ ...values, resident: e.target.value })}
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
            onClick={updateButtonClick}
          >
            Update
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
                Elderly DataTable
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
              <ArgonButton
                variant="outlined"
                color="info"
                size="small"
                onClick={() => importElderlyFile(fetchData)}
              >
                Import
              </ArgonButton>
              <ArgonButton variant="outlined" color="info" size="small" onClick={ExportFileElderly}>
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
            <DataTableElderly table={dataTableData} canSearch onDeleteRow={fetchData} />
          )}
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
