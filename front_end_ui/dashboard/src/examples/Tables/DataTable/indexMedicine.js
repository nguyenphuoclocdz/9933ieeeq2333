import styles from "./ButtonStyles.module.css";
import { useMemo, useEffect, useState } from "react";
import axios from "axios";
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
import { validatePrice } from "components/Validate/ValidateFunctions";
import { validateString } from "components/Validate/ValidateFunctions";

// Argon Dashboard 2 PRO MUI example components
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";
import { preventDefault } from "@fullcalendar/react";
import { Link, useNavigate, Rou, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Swal_show from "components/Swal";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Tooltip,
} from "@mui/material";

import ArgonButton from "components/ArgonButton";
import swal from "assets/theme/components/swal";
import { render } from "@testing-library/react";
import putRequest from "components/API_Put";
import getRequest from "components/API_Get";
import deleteRequest from "components/API_Delete";
import FormField from "components/Validate/FormField";
import { validateNotNullOrSpace } from "components/Validate/ValidateFunctions";

function DataTableMedicine({
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
  const role = localStorage.getItem("role");
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
    id: id,
    drugName: "",
    form: "",
    quantity: 0,
    expiryDate: "",
    sideEffects: "",
    indications: "",
    contraindications: "",
    price: 0,
  });
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



  // Validation part ********/
  const [inputErrors, setInputErrors] = useState({
    drugName: false,
    form: false,
    quantity: false,
    sideEffects: false,
    indications: false,
    contraindications: false,
    price: false,
  });

  const [inputSuccess, setInputSuccess] = useState({
    drugName: false,
    form: false,
    quantity: false,
    sideEffects: false,
    indications: false,
    contraindications: false,
    price: false,

  });
  const [errorMessage, setErrorMessage] = useState({
    drugName: false,
    form: false,
    quantity: false,
    sideEffects: false,
    indications: false,
    contraindications: false,
    price: false,

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
    if (!validateString(user.drugName)) {

      newErrors.drugName = true;
      errorsFound = true;
      newErrorMessage.drugName = "Please enter valid drugName";
    } else {
      newSuccess.drugName = true;
    }

    if (!validateString(user.form)) {
      newErrors.form = true;
      errorsFound = true;
      newErrorMessage.form = "Please enter valid form";
    } else {
      newSuccess.form = true;
    }

    if (!validatePrice(user.quantity)) {
      newErrors.quantity = true;
      errorsFound = true;
      newErrorMessage.quantity = "Please enter valid quantity";
    } else {
      newSuccess.quantity = true;
    }

    if (!validateString(user.sideEffects)) {

      newErrors.sideEffects = true;
      errorsFound = true;
      newErrorMessage.sideEffects = "Please enter valid sideEffects";
    } else {
      newSuccess.sideEffects = true;
    }

    if (!validateString(user.indications)) {

      newErrors.indications = true;
      errorsFound = true;
      newErrorMessage.indications = "Please enter valid indications";
    } else {
      newSuccess.indications = true;
    }

    if (!validateString(user.contraindications)) {

      newErrors.contraindications = true;
      errorsFound = true;
      newErrorMessage.contraindications = "Please enter valid contraindications";
    } else {
      newSuccess.contraindications = true;
    }

    if (!validatePrice(user.price)) {
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
  const formatExpiryDate = (datetimeString) => {
    const expiryDateTime = new Date(datetimeString);
    const year = expiryDateTime.getFullYear();
    const month = (expiryDateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = expiryDateTime.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const fetchData = async (id) => {
    getRequest(`/api/medicine/${id}`, (response) => {
      if (response.status === "success") {
        const userData = response.data;
        //console.log(userData);
        const formattedExpiryDate = formatExpiryDate(userData.expiryDate);
        setValues({
          id: userData.medicineId,
          drugName: userData.drugName,
          form: userData.form,
          quantity: userData.quantity,
          expiryDate: formattedExpiryDate,
          sideEffects: userData.sideEffects,
          indications: userData.indications,
          contraindications: userData.contraindications,
          price: userData.price,
        });
      } else {
        Swal_show("error", "Error please login again");
        reject({ status: "error", message: "Error please login again" });
      }
    });
  };

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

  const setDisable = (isDisable, id) => {
    Swal.fire({
      title: "Are you sure?",
      text:
        isDisable === "true"
          ? "you are going to unable this row"
          : "you are going to disable this row",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: isDisable === "true" ? "Yes, unable this" : "Yes, disable it!",
    }).then((result) => {
      if (result.isConfirmed) {
        disable(id);
        Swal.fire({
          title: isDisable === "true" ? "Unable" : "Disable",
          text: isDisable === "true" ? "The row has been unabled" : "The row has been disabled.",
          icon: "success",
        });
      }
    });
  };

  const handleUpdate = async (e) => {
    if (!validateForm(values, setInputErrors, setInputSuccess)) {
      putRequest("/api/medicine/" + values.id, values, (response) => {
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
        deleteRequest("/api/medicine/" + id, (response) => {
          //console.log(response);
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

  useEffect(() => {
    if (on) {
      fetchData();
    }
  }, []);

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
      drugName: "",
      form: "",
      quantity: "",
      expiryDate: "",
      sideEffects: "",
      indications: "",
      contraindications: "",
      price: "",

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
      quantity: "",
      expiryDate: "",
      sideEffects: "",
      indications: "",
      contraindications: "",
      price: "",

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
        <Dialog open={on}>
          <DialogTitle className={styles.btnTitle}>Update</DialogTitle>
          <DialogContent>
            <ArgonBox component="form" pb={3} px={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormField
                    success={inputSuccess.drugName}
                    errorMessage={errorMessage.drugName}
                    error={inputErrors.drugName}
                    value={values.drugName}
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
                    value={values.form}
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
                    value={values.quantity}
                    name="quantity"
                    label="quantity"
                    placeholder="quantity"
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <span>
                      <FormField
                        disabled={true}
                        label="time"
                        placeholder="yyyy-MM-dd"
                        //inputProps={{ type: "date" }}
                        value={values.expiryDate}
                      //  onChange={(e) => setValues({ ...values, time: e.target.value })}
                      />
                    </span>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormField
                    success={inputSuccess.price}
                    errorMessage={errorMessage.price}
                    error={inputErrors.price}
                    value={values.price}
                    name="price"
                    label="price"
                    placeholder="price"
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormField
                    success={inputSuccess.sideEffects}
                    errorMessage={errorMessage.sideEffects}
                    error={inputErrors.sideEffects}
                    value={values.sideEffects}
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
                    value={values.indications}
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
                    value={values.contraindications}
                    name="contraindications"
                    label="contraindications"
                    placeholder="contraindications"
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
                  <FormField
                    label="Medicine"
                    value={values.drugName}
                    placeholder="medicine name"
                    onChange={(e) => setValues({ ...values, drugName: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormField
                    label="form"
                    value={values.form}
                    placeholder="form"
                    onChange={(e) => setValues({ ...values, form: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormField
                    label="quantity"
                    placeholder="10"
                    inputProps={{ type: "number" }}
                    value={values.quantity}
                    onChange={(e) => setValues({ ...values, quantity: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormField
                    label="expiryDate"
                    placeholder="30/4/1975"
                    inputProps={{ type: "date" }}
                    value={values.expiryDate}
                    onChange={(e) => setValues({ ...values, expiryDate: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormField
                    label="Price"
                    placeholder="10"
                    value={values.Price}
                    onChange={(e) => setValues({ ...values, Price: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormField
                    label="sideEffects"
                    placeholder="restore health"
                    value={values.sideEffects}
                    onChange={(e) => setValues({ ...values, sideEffects: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormField
                    label="indications"
                    placeholder="patient"
                    value={values.indications}
                    onChange={(e) => setValues({ ...values, indications: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormField
                    label="contraindications"
                    placeholder="People with medicine allergies"
                    value={values.contraindications}
                    onChange={(e) => setValues({ ...values, contraindications: e.target.value })}
                  />
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
                          ></ArgonTypography>
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
                              onClick={() => moveToUpdate(cell.row.original.medicineId)}
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
                              onClick={() => handleDelete(cell.row.original.medicineId)}
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
DataTableMedicine.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the DataTable
DataTableMedicine.propTypes = {
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

export default DataTableMedicine;
