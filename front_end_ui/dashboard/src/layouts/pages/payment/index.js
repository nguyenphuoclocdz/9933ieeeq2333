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
import DataTable from "examples/Tables/DataTable/indexPayment";
import CircularProgress from "@mui/material/CircularProgress";
// Data
//import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import { useState, useEffect } from "react";
import axios from "axios";
import ArgonButton from "components/ArgonButton";
import getRequest from "components/API_Get";
import styles from 'examples/Tables/DataTable/ButtonStyles.module.css';
import ArgonBadge from "components/ArgonBadge";
import putRequest from "components/API_Put";
import Swal_show from "components/Swal";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import FormField from "layouts/account/components/FormField";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";

function DataTables() {
  let nagative = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "paymentID", accessor: "paymentID" },
      { Header: "Content", accessor: "Content" },
      { Header: "UserId", accessor: "UserId" },
      { Header: "Money", accessor: "Money" },
      { Header: "Status", accessor: "Status" },
      { Header: "Created_at", accessor: "Created_at" },
      { Header: "Button", accessor: "button" },
    ],
    rows: [],
  });

  const [values, setValues] = useState({
    paymentID: '',
    Content: '',
    UserId: '',
    Money: '',
    Status: '',
    Created_at: '',
    button: ''
  });

  const fetchData = async () => {
    setLoading(true);
    getRequest("/api/payment", (response) => {

      const userData = response.data;
      const foramttedData = userData.map((payments) => {
        let badgeColor, badgeContent, button;
        switch (payments.status) {
          case 0:
            badgeColor = "warning";
            badgeContent = "Awaiting payment";
            button = <button className={styles.acceptButton} onClick={() => nagative("/account/invoice/" + payments.paymentID)}>View</button>;
            break;
          case 1:
            badgeColor = "success";
            badgeContent = "Paid";
            button = <button className={styles.acceptButton} onClick={() => nagative("/account/invoice/  " + payments.paymentID)}>View</button>;
            break;
          default:
            badgeColor = "default";
            badgeContent = "Unknown status";
            button: null;
        }
        return {
          paymentID: payments.paymentID,
          Content: payments.content,
          UserId: payments.userId,
          Money: numeral(payments.money).format('0,0') + " VNĐ",
          Created_at: new Date(payments.created_at).toLocaleString("en-GB", {
            timeZone: "Asia/Ho_Chi_Minh",
          }),
          Status: (
            <ArgonBadge variant="contained" color={badgeColor} size="xs" badgeContent={badgeContent} container />
          ),
          button,
        };
      });


      setLoading(false);
      console.log(foramttedData)
      setDataTableData((prevState) => ({ ...prevState, rows: foramttedData }));
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const acceptButtonClick = (elderlyId) => {
    putRequest("/api/elderly/accept/" + elderlyId, {
      "status": 1
    }, (response) => {
      console.log(response);
      if (response.status === "success") {
        Swal_show('success', 'Elderly accept successfully');
        fetchData();
      } else {
        Swal_show('success', response.message);
      }
    });
  }

  const updateButtonClick = (elderlyId) => {
    alert(elderlyId);
  }

  const [on, setOn] = useState(false);
  const openUpdate = (elderlyId) => {
    getRequest("/api/elderly/" + elderlyId, (response) => {
      if (response.status === "success") {
        setValues(response.data);
        setOn(true);
      } else {
        Swal_show('success', response.message);
      }
    });
  }
  const handleClose = () => {
    setOn(false);
  }

  return (

    <DashboardLayout>
      <Dialog open={on} >
        <DialogTitle className={styles.btnTitle}>Update</DialogTitle>
        <DialogContent>
          <ArgonBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="fullNameElderly"
                  value={values.fullNameElderly}
                  placeholder="Thompson"
                  onChange={e => setValues({ ...values, fullNameElderly: e.target.value })} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  label="genderElderly"
                  placeholder="genderElderly"
                  value={values.genderElderly}
                  onChange={e => setValues({ ...values, genderElderly: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  label="relative"
                  placeholder="relative"
                  value={values.relative}
                  onChange={e => setValues({ ...values, relative: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  label="domicile"
                  placeholder="domicile"
                  value={values.domicile}
                  onChange={e => setValues({ ...values, domicile: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  label="created_at"
                  placeholder="created_at"
                  value={values.created_at}
                  onChange={e => setValues({ ...values, created_at: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  label="birthdayElderly"
                  placeholder="birthdayElderly"
                  value={values.birthdayElderly}
                  onChange={e => setValues({ ...values, birthdayElderly: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  label="resident"
                  placeholder="resident"
                  value={values.resident}
                  onChange={e => setValues({ ...values, resident: e.target.value })}
                />
              </Grid>


              <Grid item xs={12} md={12}>
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
          <ArgonBox p={3} lineHeight={1}>
            <ArgonTypography variant="h5" fontWeight="medium">
              List Payment
            </ArgonTypography>
            <ArgonTypography variant="button" fontWeight="regular" color="text">
            </ArgonTypography>
          </ArgonBox>
          {loading ? (
            <ArgonBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100px"
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
