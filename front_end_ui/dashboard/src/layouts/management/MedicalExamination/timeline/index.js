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
import Stack from "@mui/material/Stack";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import ArgonSelect from "components/ArgonSelect";
// Viện Dưỡng Lão An Nghỉ MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import TimelineList from "examples/Timeline/TimelineList";

// Viện Dưỡng Lão An Nghỉ MUI contexts
import { useArgonController } from "context";

// Data

import { useParams } from "react-router-dom";
import TimelineData from "./data/timelineData";
import { useEffect, useState } from "react";
import getRequest from "components/API_Get";
import ArgonTypography from "components/ArgonTypography";
import TimelineItem from "../TimelineItem";
import Footer from "examples/Footer";
import postRequest from "components/API_Post";
import Swal_show from "components/Swal";
import putRequest from "components/API_Put";
import FormField from "../FormField";
import PropTypes from "prop-types";
function MedicalTimeline() {
  const [timelineData, setTimelineData] = useState([]);
  const [controller] = useArgonController();
  const { darkMode } = controller;
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [elderlyValue, setElderlyValue] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [values, setValues] = useState({
    medicalExaminationId: "",
    doctorId: doctorOptions.length > 0 ? doctorOptions[0] : null,
    elderlyId: elderlyValue.length > 0 ? elderlyValue[0] : null,
    title: "",
    description: "",
  });

  const [valuesUpdate, setValuesUpdate] = useState({
    medicalExaminationId: "",
    doctorId: "",
    elderlyId: "",
    title: "",
    description: "",
  });

  // Validation part ********/
  const [inputErrors, setInputErrors] = useState({
    description: false,
    title: false,
  });

  const [inputSuccess, setInputSuccess] = useState({
    description: false,
    title: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    description: "",
    title: "",
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

    if (values.description.trim() === "") {
      newErrors.description = true;
      errorsFound = true;
      newErrorMessage.description = "Description should not be empty!"
    } else if (!isValidString(values.description)) {
      newErrors.description = true;
      errorsFound = true;
      newErrorMessage.description = "Description string is not valid"
    }
    else {
      newSuccess.description = true;
    }


    if (values.title.trim() === "") {
      newErrors.title = true;
      errorsFound = true;
      newErrorMessage.title = "Title should not be empty!"
    }
    else if (!isValidString(values.title)) {
      newErrors.title = true;
      errorsFound = true;
      newErrorMessage.title = "Title string is not valid"
    }
    else {
      newSuccess.title = true;
    }

    setInputSuccess({ ...inputSuccess, ...newSuccess });
    setInputErrors({ ...inputErrors, ...newErrors });
    setErrorMessage({ ...errorMessage, ...newErrorMessage });

    return errorsFound;
  }

  function isValidString(input) {
    // Check if the input contains only spaces
    if (/^\s+$/.test(input)) {
      return false;
    }

    // Check if the input starts with an alphabet character
    if (!/^[a-zA-Z]/.test(input)) {
      return false;
    }

    // Check if the input contains only letters, spaces, and doesn't have any special characters or numbers
    if (!/^[a-zA-Z\s]+$/.test(input)) {
      return false;
    }

    // Check if the input has at least 2 words
    const words = input.split(/\s+/);
    if (words.length < 2) {
      return false;
    }

    return true;
  }

  // Validation part ********/

  const handleAdd = () => {
    if (!validateForm(values, setInputErrors, setInputSuccess)) {
      postRequest("api/examination", values, (response) => {
        if (response.status === "success") {
          Swal_show("success", "Medical examination is added successfully");
          fetchData();
        } else {
          Swal_show("error", response.message);
        }
      });
      ToggleModalAdd();
      resetValue();
    } else {
      return;
    }
  };

  const handleUpdate = () => {
    if (!validateForm(valuesUpdate, setInputErrors, setInputSuccess)) {
      putRequest("api/examination/" + valuesUpdate.medicalExaminationId, valuesUpdate, (response) => {
        if (response.status === "success") {
          Swal_show("success", "Medical examination is updated successfully");
          fetchData();
        } else {
          Swal_show("error", response.message);
        }
      });
      ToggleModalUpdate();
    } else {
      return;
    }
  };

  const resetValue = () => {
    setValues({
      medicalExaminationId: "",
      doctorId: doctorOptions.length > 0 ? doctorOptions[0].value : null,
      elderlyId: elderlyValue.length > 0 ? elderlyValue[0].value : null,
      title: "",
      description: "",
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

  const ToggleModalAdd = () => {
    setAdd(!add);
    resetValue();
  };
  const ToggleModalUpdate = () => {
    setEdit(!edit);
    resetValue();
  };

  const fetchData = async () => {
    getRequest("api/examination", (response) => {
      if (response.status === "success") {
        const newData = response.data
          .map((item) => ({
            color: "success", // Đặt màu tùy ý
            icon: "notifications", // Icon tùy ý
            title: item.title,
            dateTime: item.createTime, // Sử dụng thời gian cập nhật hoặc tạo mới từ dữ liệu
            description: item.description,
            medicalExaminationId: item.medicalExaminationId,
            doctorId: item.doctorId,
            elderlyId: item.elderlyId,
            room: item.roomName
          }))
          .sort((a, b) => b.medicalExaminationId - a.medicalExaminationId);
        setTimelineData(newData);
      } else {
      }
    });
  };

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

  const fetchDoctorOptions = async () => {
    getRequest("/api/doctor", (response) => {
      if (response.status === "success") {
        const newData = response.data.map((item) => ({
          value: item.userId,
          label: `${item.fullname} - ${item.userId}`,
        }));
        setDoctorOptions(newData);
      }
    });
  };

  function formatDateTime(datetimeString) {
    const dateTime = new Date(datetimeString);

    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
    const day = dateTime.getDate().toString().padStart(2, "0");

    return `${hours}:${minutes} ${year}-${month}-${day}`;
  }

  useEffect(() => {
    fetchData();
    fetchElderlyOptions();
    fetchDoctorOptions();
  }, []);

  const renderTimelineItems = timelineData.map(
    ({
      color,
      icon,
      title,
      dateTime,
      description,
      lastItem,
      elderlyId,
      doctorId,
      medicalExaminationId,
      room
    }) => (
      <TimelineItem
        key={medicalExaminationId}
        color={color}
        icon={icon}
        title={title}
        dateTime={formatDateTime(dateTime)}
        description={description}
        badges={[`${elderlyId}`, `${doctorId}`, `${room}`]}
        lastItem={lastItem}
        toggleUpdate={ToggleModalUpdate}
        setV={setValuesUpdate}
        ID={medicalExaminationId}
        fetch={fetchData}
      />
    )
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
          <ArgonBox lineHeight={1}>
            <ArgonTypography variant="h5" fontWeight="medium">
              Medical examination
            </ArgonTypography>
          </ArgonBox>
          <Stack spacing={1} direction="row">
            <ArgonButton variant="gradient" color="info" size="small" onClick={ToggleModalAdd}>
              + New
            </ArgonButton>
          </Stack>
        </ArgonBox>
        <ArgonBox my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <TimelineList dark={darkMode} title="">
                {renderTimelineItems}
              </TimelineList>
            </Grid>
          </Grid>
        </ArgonBox>
      </Card>
      <Dialog open={add} maxWidth="md" fullWidth>
        <DialogTitle color="primary"> Add</DialogTitle>
        <DialogContent>
          <ArgonBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
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
                      Doctor
                    </ArgonTypography>
                  </ArgonBox>
                  <ArgonSelect
                    defaultValue={doctorOptions.length > 0 ? doctorOptions[0] : null}
                    options={doctorOptions}
                    onChange={(selectedOption) =>
                      setValues({ ...values, doctorId: selectedOption.value })
                    }
                  />
                </ArgonBox>
              </Grid>
              <Grid item xs={12} sm={6}>
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
                    defaultValue={elderlyValue.length > 0 ? elderlyValue[0] : null}
                    options={elderlyValue}
                    onChange={(selectedOption) =>
                      setValues({ ...values, elderlyId: selectedOption.value })
                    }
                  />
                </ArgonBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.title}
                  error={inputErrors.title}
                  errorMessage={errorMessage.title}
                  label="Title"
                  placeholder="Title"
                  name="title"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.description}
                  errorMessage={errorMessage.description}
                  error={inputErrors.description}
                  name="description"
                  label="description"
                  placeholder="description"
                  onChange={handleInputChange}
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
            onClick={ToggleModalAdd}
          >
            Close
          </ArgonButton>
          <ArgonButton
            variant="gradient"
            color="error"
            size="medium"
            type="submit"
            onClick={handleAdd}
          >
            Add
          </ArgonButton>
        </DialogActions>
      </Dialog>
      <ArgonBox>
        <Dialog open={edit} maxWidth="md" fullWidth>
          <DialogTitle color="primary">Update</DialogTitle>
          <DialogContent>
            <ArgonBox component="form" pb={3} px={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormField
                    label="Doctor"
                    value={valuesUpdate.doctorId != null ? valuesUpdate.doctorId : ""}
                    disabled={true}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormField
                    label="Elderly"
                    value={valuesUpdate.elderlyId != null ? valuesUpdate.elderlyId : ""}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormField
                    success={inputSuccess.title}
                    error={inputErrors.title}
                    errorMessage="Title should not be empty"
                    label="Title"
                    placeholder="Title"
                    value={valuesUpdate.title}
                    name="title"
                    onChange={handleInputChangeUpdate}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormField
                    label="description"
                    placeholder="description"
                    success={inputSuccess.description}
                    errorMessage="Description should not be empty"
                    error={inputErrors.description}
                    value={valuesUpdate.description}
                    name="description"
                    onChange={handleInputChangeUpdate}
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
              onClick={ToggleModalUpdate}
            >
              Close
            </ArgonButton>
            <ArgonButton
              variant="gradient"
              color="error"
              size="medium"
              type="submit"
              onClick={handleUpdate}
            >
              Update
            </ArgonButton>
          </DialogActions>
        </Dialog>
      </ArgonBox>
    </DashboardLayout>
  );
}
MedicalTimeline.propTypes = {
  elderlyId: PropTypes.number
}
export default MedicalTimeline;
