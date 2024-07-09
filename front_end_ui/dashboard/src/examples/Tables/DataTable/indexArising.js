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
import styles from "./ButtonStyles.module.css";
import { useMemo, useEffect, useState } from "react";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import BlockIcon from "@mui/icons-material/Block";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonSelect from "components/ArgonSelect";
import ArgonInput from "components/ArgonInput";
import ArgonPagination from "components/ArgonPagination";

// Argon Dashboard 2 PRO MUI example components
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";
import { preventDefault } from "@fullcalendar/react";
import { Link, useNavigate, Rou, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Swal_show from "components/Swal";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import ArgonButton from "components/ArgonButton";
import swal from "assets/theme/components/swal";
import { render } from "@testing-library/react";
import putRequest from "components/API_Put";
import deleteRequest from "components/API_Delete";
import getRequest from "components/API_Get";
import FormField from "components/Validate/FormField";
import { validatePrice } from "components/Validate/ValidateFunctions";
import { validateString } from "components/Validate/ValidateFunctions";

function DataTableArising({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
  onDeleteRow,
}) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage.entries ? entriesPerPage.entries : [5, 10, 15, 20, 25];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);
  const { id } = useParams();
  const [values, setValues] = useState({
    id: "",
    servicesArisingId: "",
    elderlyId: "",
    service: "",
    money: 0,
    time: "",
    status: "",
  });
  const role = localStorage.getItem("role");
  const [on, setOn] = useState(false);
  const [view, setView] = useState(false);
  const [reRender, setReRender] = useState(false);
  let navigate = useNavigate();

  // Set the entries per page value based on the select value
  const setEntriesPerPage = ({ value }) => setPageSize(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <ArgonPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </ArgonPagination>
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

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

  const formatTimeArising = (datetimeString) => {
    const timeArising = new Date(datetimeString);
    const year = timeArising.getFullYear();
    const month = (timeArising.getMonth() + 1).toString().padStart(2, "0");
    const day = timeArising.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const fetchData = async (id) => {
    if (!id) return; // Exit early if id is undefined
   
    getRequest(`/api/arising/${id}`, (response) => {
      if (response.status === "success") {
        const userData = response.data;
        setValues({
          id: userData.servicesArisingId,
          elderlyId: userData.elderlyId,
          service: userData.service,
          money: userData.money,
          time: formatTimeArising(userData.time),
          status: userData.status,
        });
    
      } else {
        Swal_show("error", "Error please login again");
        reject({ status: "error", message: "Error please login again" });
      }
    });
  };
  
  useEffect(() => {
    if (id) {
      fetchData(id); // Fetch data when id is defined
    }
  }, [id]);

  const disable = async (idValue) => {
    putRequest("api/account/disable/" + idValue, null, (response) => {
      if (response.status === "success") {
        onDeleteRow();
      } else {
        Swal.fire({
          icon: "error",
          title: "Somthing went wrong!",
          text: "not good",
        });
      }
    });
  };



  // Validation part ********/
  const [inputErrors, setInputErrors] = useState({
    service: false,
    money: false,
  });

  const [inputSuccess, setInputSuccess] = useState({
    service: false,
    money: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    service: "",
    money: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setInputErrors({ ...inputErrors, [name]: false });
    setInputSuccess({ ...inputSuccess, [name]: false });
  };

  function validateForm(user, setInputErrors, setInputSuccess) {
    let errorsFound = false;
    const newErrors = {};
    const newSuccess = {};
    const newErrorMessage = {};
    if (!validatePrice(user.money)) {
     
      newErrors.money = true;
      errorsFound = true;
      newErrorMessage.money = "Please enter valid number";
    } else {

     
      newSuccess.money = true;
    }
    if (!validateString(user.service)) {
      newErrors.service = true;
      errorsFound = true;
      newErrorMessage.service = "Please enter valid string";
    } else {
      newSuccess.service = true;
    }

    setInputSuccess({ ...inputSuccess, ...newSuccess });
    setInputErrors({ ...inputErrors, ...newErrors });
    setErrorMessage({ ...errorMessage, ...newErrorMessage });
    return errorsFound;
  }

  // Validation part ********/
  const handleUpdate = async (e) => {
   
  if(!validateForm(values,setInputErrors,setInputSuccess)){
    putRequest("/api/arising/" + values.id, values, (response) => {
      if (response.status == "success") {
        Swal.fire({
          icon: "success",
          title: "Nice!",
          text: "Update successfully",
        });
        handleClose();
        onDeleteRow();
      } else {
        Swal.fire({
          icon: "error",
          title: "Somthing went wrong!",
          text: "not good",
        });
      }
    });
  }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRequest("/api/arising/" + id, (response) => {
        
          if (response.status == "success") {
            onDeleteRow();
          } else {
            Swal.fire({
              icon: "error",
              title: "Somthing went wrong!",
              text: "not good",
            });
          }
        });
        Swal.fire({
          title: "Deleted!",
          text: "The row has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const moveToUpdate = (id) => {
    resetValue();
    fetchData(id);
    setOn(true);
  };

  const handleClose = () => {
    setOn(false);
  };

  const showView = (id) => {
    setView(true);
    fetchData(id);
  };

  const handleView = () => {
    setView(false);
  };
  const resetValue = () => {

    setValues({
      servicesArisingId: "",
      elderlyId:"",
      service: "",
      money: "",
      time: "",
      status: "",
    });
    setInputErrors({
      service: false,
      money: false,
    });
    setInputSuccess({
      service: false,
      money: false,
     
    });
    setErrorMessage({
      service: "",
      money: "",
    
    });
  };
 
  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      {entriesPerPage || canSearch ? (
        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          {entriesPerPage && (
            <ArgonBox display="flex" alignItems="center">
              <ArgonBox width="25%">
                <ArgonSelect
                  defaultValue={{ value: defaultValue, label: defaultValue }}
                  options={entries.map((entry) => ({ value: entry, label: entry }))}
                  onChange={setEntriesPerPage}
                  size="small"
                />
              </ArgonBox>
              <ArgonTypography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </ArgonTypography>
            </ArgonBox>
          )}
          {canSearch && (
            <ArgonBox width="12rem" ml="auto">
              <ArgonInput
                placeholder="Search..."
                value={search}
                onChange={({ currentTarget }) => {
                  setSearch(search);
                  onSearchChange(currentTarget.value);
                }}
              />
            </ArgonBox>
          )}
        </ArgonBox>
      ) : null}
      <Table {...getTableProps()}>
        <Dialog open={on} maxWidth="md" fullWidth>
          <DialogTitle className={styles.btnTitle}>Update</DialogTitle>
          <DialogContent>
            <ArgonBox component="form" pb={3} px={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Tooltip title="Cannot edit" placement="top">
                    <span>
                      <FormField
                        disabled={true}
                        label="elderlyId"
                        placeholder="1"
                        value={values.elderlyId}
                        // onChange={(e) => setValues({ ...values, elderlyId: e.target.value })}
                      />
                    </span>
                  </Tooltip>
                </Grid>

                <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.service}
                  errorMessage={errorMessage.service}
                  error={inputErrors.service}
                  value={values.service}
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
                  value={values.money}
                  onChange={handleInputChange}
                />
              </Grid>
                <Grid item xs={12} sm={6}>

                  <Tooltip title="Cannot edit" placement="top">
                    <span>
                    <FormField
                      disabled={true}
                      label="time"
                      placeholder="yyyy-MM-dd"
                      //inputProps={{ type: "date" }}
                      value={values.time}
                      //  onChange={(e) => setValues({ ...values, time: e.target.value })}
                    />
                    </span>
                  </Tooltip>
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
              onClick={handleUpdate}
            >
              Update
            </ArgonButton>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* --------------------------- Views -------------------------------- */}

        <Dialog open={view}>
          <DialogTitle className={styles.btnTitle}>View</DialogTitle>
          <DialogContent>
            <ArgonBox component="form" pb={3} px={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormField label="fullname" value={values.id} placeholder="Thompson" />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormField
                    label="email"
                    placeholder="example@email.com"
                    inputProps={{ type: "email" }}
                    value={values.elderlyId}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormField label="User name" placeholder="Your username" value={values.service} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormField
                    label="phone number"
                    placeholder="+84 735 631 620"
                    inputProps={{ type: "number" }}
                    value={values.money}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormField label="Domicile" placeholder="CT" value={values.time} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormField label="Domicile" placeholder="CT" value={values.status} />
                </Grid>
                <Grid item xs={12} md={12}></Grid>
              </Grid>
            </ArgonBox>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleView} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <ArgonBox component="thead">
          {headerGroups.map((headerGroup, key) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <DataTableHeadCell
                  key={index}
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                  sorted={setSortedValue(column)}
                >
                  {column.render("Header")}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </ArgonBox>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row);
            return (
              <TableRow key={key} {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <DataTableBodyCell
                    key={index}
                    noBorder={noEndBorder && rows.length - 1 === key}
                    align={cell.column.align ? cell.column.align : "left"}
                    {...cell.getCellProps()}
                  >
                    {cell.column.id === "actionCell" ? (
                      <ArgonBox display="flex" alignItems="center">
                        {role == 1 && (
                          <ArgonTypography
                            variant="body1"
                            color="secondary"
                            sx={{ cursor: "pointer", lineHeight: 0 }}
                          >
                            {/* <Tooltip
                              title={cell.row.original.disableV === "true" ? "Enable" : "Disable"}
                              placement="left"
                              onClick={() =>
                                setDisable(cell.row.original.disableV, cell.row.original.id)
                              }
                            >
                              {cell.row.original.disableV === "true" ? (
                                <WifiProtectedSetupIcon />
                              ) : (
                                <BlockIcon />
                              )}
                            </Tooltip> */}
                          </ArgonTypography>
                        )}

                        <ArgonBox mx={2}>
                          <ArgonTypography
                            variant="body1"
                            color="secondary"
                            sx={{ cursor: "pointer", lineHeight: 0 }}
                          >
                            <Tooltip
                              title="Edit"
                              placement="top"
                              onClick={() => moveToUpdate(cell.row.original.servicesArisingId)}
                            >
                              <Icon>edit</Icon>
                            </Tooltip>
                          </ArgonTypography>
                        </ArgonBox>
                        <Link to="" style={{ textDecoration: "none" }}>
                          <ArgonTypography
                            variant="body1"
                            color="secondary"
                            sx={{ cursor: "pointer", lineHeight: 0 }}
                          >
                            <Tooltip
                              title="Delete"
                              placement="left"
                              onClick={() => handleDelete(cell.row.original.servicesArisingId)}
                            >
                              <Icon>delete</Icon>
                            </Tooltip>
                          </ArgonTypography>
                        </Link>
                      </ArgonBox>
                    ) : (
                      cell.render("Cell")
                    )}
                  </DataTableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <ArgonBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <ArgonBox mb={{ xs: 3, sm: 0 }}>
            <ArgonTypography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </ArgonTypography>
          </ArgonBox>
        )}
        {pageOptions.length > 1 && (
          <ArgonPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {canPreviousPage && (
              <ArgonPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </ArgonPagination>
            )}
            {renderPagination.length > 6 ? (
              <ArgonBox width="5rem" mx={1}>
                <ArgonInput
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </ArgonBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <ArgonPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </ArgonPagination>
            )}
          </ArgonPagination>
        )}
      </ArgonBox>
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
DataTableArising.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the DataTable
DataTableArising.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
  onDeleteRow: PropTypes.func,
};

export default DataTableArising;
