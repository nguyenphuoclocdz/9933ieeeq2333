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
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import FormField from "layouts/account/components/FormField";
import ArgonButton from "components/ArgonButton";
import axios from "axios";
import Swal_show from "components/Swal";
import Swal from "sweetalert2";
import DataTableActivity from "examples/Tables/DataTable/indexActivity";
import postRequest from "components/API_Post";
import { useNavigate } from "react-router-dom";

function DataTables() {
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "activityId", accessor: "activityId" },
      { Header: "title", accessor: "title", width: "10%" },
      { Header: "history", accessor: "history" },
      { Header: "date_create", accessor: "date_create", width: "7%" },
      { Header: "updated_at", accessor: "updated_at" },
      { Header: "elderlyId", accessor: "elderlyId" },
      { Header: "", accessor: "update" },
      { Header: "", accessor: "delete" },
    ],
    rows: [],
  });

  const handleDelete = (activityId) => {
    // Xử lý logic xóa dữ liệu với activityId cụ thể
    // Sau đó gọi hàm fetchData để tải lại dữ liệu mới
  };

  const handleEdit = (activityId) => {
    // Xử lý logic chỉnh sửa dữ liệu với activityId cụ thể
    // Điều hướng người dùng đến trang chỉnh sửa hoặc hiển thị một dialog chỉnh sửa
  };

  const [activity, setActivity] = useState({
    title: "",
    history: "",
    date_create: "",
    elderlyId: "",
  });

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
            elderlyId: activity.elderlyId,
            date_create: activity.date_create,
            updated_at: activity.updated_at,
          }));
          setDataTableData((prevState) => ({ ...prevState, rows: formattedData }));
        } else {
          Swal_show("error", "Có lỗi sảy ra vui lòng đăng nhập lại!");
          reject({ status: "error", message: "Có lỗi sảy ra vui lòng đăng nhập lại!" });
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
  }

  const { title, history, elderlyId, date_create } = activity;
  const onInputChange = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
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
  const addUser = async (e) => {
    e.preventDefault();
    postRequest(
      "/api/activity",
      {
        title,
        history,
        date_create,
        elderlyId,
      },
      (response) => {
        if (response.status === "success") {
          // Thêm dữ liệu mới vào danh sách hiện có
          const newActivity = {
            activityId: response.data.activityId,
            title,
            history,
            elderlyId,
            date_create,
            updated_at: response.data.updated_at,
          };
          setDataTableData((prevState) => ({
            ...prevState,
            rows: [...prevState.rows, newActivity],
          }));
          // Hiển thị thông báo thành công
          Swal.fire({
            icon: "success",
            title: "Nice!",
            text: "Activity added successfully!",
          });
          // Đóng dialog thêm mới
          handleClose();
        } else {
          // Hiển thị thông báo lỗi
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to add activity. Please try again.",
          });
        }
      }
    );
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
                  value={title}
                  onChange={(e) => onInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="date_create"
                  placeholder="date_create"
                  name="date_create"
                  value={date_create}
                  onChange={(e) => onInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="history"
                  placeholder="history"
                  name="history"
                  value={history}
                  onChange={(e) => onInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="elderlyId"
                  placeholder="elderlyId"
                  name="elderlyId"
                  inputProps={{ type: "number" }}
                  value={elderlyId}
                  onChange={(e) => onInputChange(e)}
                />
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
            <DataTableActivity
              table={dataTableData}
              canSearch
              onDeleteRow={fetchData}
              // Thêm các props xử lý sự kiện Cập nhật và Xóa
            />
          )}
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
