import { useMemo, useEffect, useState } from "react";
import axios from "axios";
import { useTable, usePagination, useGlobalFilter, useSortBy } from "react-table";
import { Table, TableBody, TableRow, Icon, TableContainer, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonSelect from "components/ArgonSelect";
import ArgonInput from "components/ArgonInput";
import ArgonPagination from "components/ArgonPagination";
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";
import Swal from "sweetalert2";
import ArgonButton from "components/ArgonButton";

function DataTableService() {
  // Code removed for brevity
  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      {/* Code for entries per page and search input removed */}
      <Table {...getTableProps()}>
        {/* Code for dialog removed */}
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
                    {cell.column.id === "update" ? (
                      <button
                        className={styles.updateButton}
                        onClick={() => moveToUpdate(cell.row.original.id)}
                      >
                        Update
                      </button>
                    ) : cell.column.id === "delete" ? (
                      <button
                        onClick={() => handleDelete(cell.row.original.id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
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
        {/* Code for pagination removed */}
      </ArgonBox>
    </TableContainer>
  );
}

DataTableService.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

DataTableService.propTypes = {
  // PropTypes definition removed for brevity
};

export default DataTableService;
