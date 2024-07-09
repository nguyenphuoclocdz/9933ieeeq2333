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
import Stack from "@mui/material/Stack";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import { useState, useEffect } from "react";
import getRequest from "components/API_Get";
import ActionCell from "./ActionCell";
import MenuCell from "./MenuCell";
import ArgonBadge from "components/ArgonBadge";
import postRequest from "components/API_Post";
import Swal_show from "components/Swal";
import Swal from "sweetalert2";
import AddNewModal from "./ViewModal";
import EditModal from "./EditModal";
import ExportFileMenu from "components/exportFile/exportMenu";
import imporMenuFile from "components/ImportFile/importMenu";

function MenuList() {
  // Badges
  const outOfStock = (
    <ArgonBadge
      variant="contained"
      color="error"
      size="xs"
      badgeContent="carnivore"
      container
      values="carnivore"
    />
  );
  const inStock = (
    <ArgonBadge
      variant="contained"
      color="success"
      size="xs"
      badgeContent="vegan"
      container
      values="vegan"
    />
  );
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [selectVegan, setSelectVegan] = useState(true);
  const [menuID, setMenuID] = useState();
  const [edit, setEdit] = useState(false);
  let columns = [
    {
      Header: "product",
      accessor: "dishName",
      width: "15%",
      renderCell: ({ value: [name, data] }) => (
        <MenuCell image={data.image} name={name} checked={data.checked} />
      ),
    },
    { Header: "dishType", accessor: "dishType" },
    { Header: "mealCategory", accessor: "mealCategory" },
    { Header: "price", accessor: "price" },
    { Header: "vegetarian", accessor: "vegetarian" },
    { Header: "ingredients", accessor: "ingredients", width: "35%" },
    { Header: "action", accessor: "action" },
  ];

  if (role == 1) {
    columns.splice(5, 0, { Header: "disable", accessor: "disable" });
  }

  const [dataTableData, setDataTableData] = useState({
    columns: columns,
    rows: [],
  });

  const [values, setValues] = useState({
    dishName: "",
    dishType: "Breakfast",
    mealCategory: "Main dish",
    price: "",
    vegetarian: true,
    ingredients: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);

      getRequest("/api/menu", (response) => {
        if (response.status === "success") {
          const userData = response.data;
          const formattedData = userData.map((item) => ({
            menuId: item.menuId,
            dishName: item.dishName,
            dishType: item.dishType,
            mealCategory: item.mealCategory,
            price: item.price,
            vegetarian: item.vegetarian === true ? inStock : outOfStock,
            ingredients: item.ingredients,
            disable: item.disable === true ? "true" : "false",
            action: (
              <ActionCell
                idValue={item.menuId}
                setMenuIDValue={setMenuID}
                setOpen={setEdit}
                fetchData={fetchData}
                isDisable={item.disable}
              />
            ),
          }));
          setDataTableData((prevState) => ({ ...prevState, rows: formattedData }));
        } else {
          Swal_show("error", "Error please login again");
          reject({ status: "error", message: "Error please login again" });
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addMenu = async () => {
    console.log("trc khi add vo thi:", values);
    postRequest("api/menu", values, (response) => {
      if (response.status == "success") {
        Swal.fire({
          icon: "success",
          title: "Nice!",
          text: "Add successfully",
        });
        closeModal();
        fetchData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Somthing went wrong!",
          text: "not good",
        });
      }
    });
  };

  const handleAdd = () => {
    setAdd(true);
  };

  const closeModal = () => {
    setAdd(false);
    setEdit(false);
  };
  const handleSelectChange = (selectedOption) => {
    setSelectVegan(selectedOption.value);
    console.log("m da chon cai nay", selectVegan);
  };

  useEffect(() => {
    fetchData();
  }, [menuID]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox my={3}>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonBox lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                All Menu
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
                onClick={() => imporMenuFile(fetchData)}
              >
                Import
              </ArgonButton>
              <ArgonButton variant="outlined" color="info" size="small" onClick={ExportFileMenu}>
                Export
              </ArgonButton>
            </Stack>
          </ArgonBox>
          <DataTable
            table={dataTableData}
            entriesPerPage={{
              defaultValue: 5,
              entries: [5, 7, 10, 15, 20, 25],
            }}
            canSearch
          />
        </Card>
      </ArgonBox>
      <Footer />
      <AddNewModal
        isOpen={add}
        handleClose={closeModal}
        setData={setValues}
        data={values}
        addData={addMenu}
      />
      <EditModal
        isOpen={edit}
        handleClose={closeModal}
        fetchData={fetchData}
        data={values}
        menuId={menuID}
        handleSelectChange={handleSelectChange}
      />
    </DashboardLayout>
  );
}

export default MenuList;
