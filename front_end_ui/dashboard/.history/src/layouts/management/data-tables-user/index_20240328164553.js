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
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import FormField from "layouts/account/components/FormField";
import ArgonButton from "components/ArgonButton";
import axios from "axios";
import Swal_show from "components/Swal";
import Swal from "sweetalert2";
import DataTablePharmacist from "examples/Tables/DataTable/indexPharmacist";

function DataTables() {
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "10%" },
      { Header: "fullname", accessor: "fullname", width: "10%" },
      { Header: "email", accessor: "email" },
      { Header: "username", accessor: "username", width: "7%" },
      { Header: "phone", accessor: "phone", },
      { Header: "domicile", accessor: "domicile", },
      { Header: "", accessor: "view", },
      { Header: "", accessor: "update", },
      { Header: "", accessor: "delete", }
    ],
    rows: [],
  });

  const [values, setValues] = useState({
    fullname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    domicile: '',
    });

  const fetchData = async () => {

    try {
      setLoading(true);


      getRequest("/api/pharmacist", (response) => {
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
          Swal_show('error', 'Có lỗi sảy ra vui lòng đăng nhập lại!');
          reject({ status: 'error', message: 'Có lỗi sảy ra vui lòng đăng nhập lại!' });

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


  const handleClose = () => {
    setAdd(false);
  }
  const handleAdd = () => {
    setAdd(true);
  }
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
  const addUser = async () => {
    const response = await api.post('api/user',values)
    .then((response) => {
      console.log(response);
      if (response.data.status == 'success') {
        Swal.fire({
          icon: "success",
          title: "Nice!",
          text: "Add successfully",
        })
        fetchData();

      }else{
        Swal.fire({
          icon: "error",
          title: "Ngu!",
          text: "not good",
        })
      }
    }
      
    )
    }




  return (
    <DashboardLayout>
              {/* <Dialog open={add} >
              <DialogTitle >Add</DialogTitle>
              <DialogContent>
              <ArgonBox component="form" pb={3} px={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormField 
                  label="fullname" 
                  placeholder="Thompson" 
                  onChange={e => setValues({...values, fullname: e.target.value})}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormField
                    label="email"
                    placeholder="example@email.com"
                    inputProps={{ type: "email" }}
                    onChange={e => setValues({...values, email: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormField 
                  label="User name" 
                  placeholder="Your username" 
                  onChange={e => setValues({...values, username: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormField 
                  label="Password" 
                  placeholder="Password" 
                  onChange={e => setValues({...values, password: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormField
                    label="phone number"
                    placeholder="+84 735 631 620"
                    inputProps={{ type: "number" }}
                    onChange={e => setValues({...values, phone: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormField 
                  label="Domicile" 
                  placeholder="CT" 
                  onChange={e => setValues({...values, domicile: e.target.value})}
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
                onClick={addUser}
                >
                Add
              </ArgonButton>
              <Button onClick={handleClose} color="primary">
              Close
              </Button>
              </DialogActions>
              </Dialog> */}
      <DashboardNavbar />
      <ArgonBox pt={6} pb={3}>
        <Card>
          <ArgonBox p={3} lineHeight={1}>
          <ArgonButton
                variant="gradient"
                color="info"
                size="large"
                type="button"
                onClick={handleAdd}
                >
                Add New 
            </ArgonButton>
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
            <DataTablePharmacist table={dataTableData} canSearch onDeleteRow={fetchData}/>
          )}
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
