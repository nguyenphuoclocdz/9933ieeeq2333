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
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Tooltip,
} from "@mui/material";
import FormField from "layouts/account/components/FormField";
import ArgonButton from "components/ArgonButton";
import putRequest from "components/API_Put";

function DataTableCamera({
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
    cameraName: "",
    link: "",
    roomLook: "",
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

  const fetchData = async (id) => {
    const response = await api
      .get(`/api/cameras/${id}`)
      .then((res) => {
        const userData = res.data.data;
        console.log(userData);
        setValues({
          id: userData.cameraId,
          cameraName: userData.cameraName,
          link: userData.link,
          roomLook: userData.roomLook,
        });
      })
      .catch((err) => console.error(err));
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
    e.preventDefault();
    console.log(values);
    const resUpdate = await api
      .put(`/api/cameras/${values.id}`, values)
      .then(
        Swal.fire({
          title: "Update successfully",
          icon: "success",
        }),
        setOn(false)
      )
      .catch((err) => console.log(err));
    onDeleteRow();
  };

  const handleDelete = async (id) => {
    const response = await api
      .delete(`/api/cameras/${id}`, {
        method: "DELETE",
      })
      .then((result) => {
        Swal.fire({
          title: "Delete successfully",
          icon: "success",
        });
      });
    onDeleteRow();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const moveToUpdate = (id) => {
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
          <DialogTitle>Update</DialogTitle>
          <DialogContent>
            <ArgonBox component="form" pb={3} px={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormField
                    label="Camera ID"
                    value={values.id}
                    placeholder="CAM000"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormField
                    label="Camera Name"
                    placeholder="CAMERA NUMBER"
                    value={values.cameraName}
                    onChange={(e) => setValues({ ...values, cameraName: e.target.value })}

                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormField
                    label="Link"
                    placeholder="https://...."
                    value={values.link}
                    onChange={(e) => setValues({ ...values, link: e.target.value })}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormField
                    label="Room Look"
                    placeholder="Room number"
                    value={values.roomLook}
                    onChange={(e) => setValues({ ...values, roomLook: e.target.value })}
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
                  <FormField label="fullname" value={values.fullname} placeholder="Thompson" />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormField
                    label="email"
                    placeholder="example@email.com"
                    inputProps={{ type: "email" }}
                    value={values.email}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormField
                    label="User name"
                    placeholder="Your username"
                    value={values.username}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormField
                    label="phone number"
                    placeholder="+84 735 631 620"
                    inputProps={{ type: "number" }}
                    value={values.phone}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormField label="Domicile" placeholder="CT" value={values.domicile} />
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
                       

                        <ArgonBox mx={2}>
                          <ArgonTypography
                            variant="body1"
                            color="secondary"
                            sx={{ cursor: "pointer", lineHeight: 0 }}
                          >
                            <Tooltip
                              title="Edit"
                              placement="top"
                              onClick={() => moveToUpdate(cell.row.original.id)}
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
                              onClick={() => handleDelete(cell.row.original.id)}
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
                {/* <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon> */}
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
                {/* <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon> */}
              </ArgonPagination>
            )}
          </ArgonPagination>
        )}
      </ArgonBox>
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
DataTableCamera.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the DataTable
DataTableCamera.propTypes = {
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

export default DataTableCamera;
