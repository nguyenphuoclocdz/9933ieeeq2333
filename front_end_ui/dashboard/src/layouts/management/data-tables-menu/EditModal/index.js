import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import getRequest from "components/API_Get";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import FormField from "layouts/account/components/FormField";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import putRequest from "components/API_Put";
import Swal from "sweetalert2";
import ArgonSelect from "components/ArgonSelect";
import ArgonTypography from "components/ArgonTypography";

const EditModal = ({ data, fetchData, isOpen, handleClose, menuId }) => {

  const [values, setValues] = useState({
    dishName: "",
    dishType: "",
    mealCategory: "",
    price: "",
    vegetarian: "",
    ingredients: "",
  });

  const editMenu = async () => {
    putRequest("api/menu/" + menuId, values, (response) => {
      console.log(response);
      if (response.status == "success") {
        Swal.fire({
          icon: "success",
          title: "Nice!",
          text: "Add successfully",
        });
        handleClose();
        fetchData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Somthing went wrong!",
          text: "not good",
        });
      }
    })
  };

  const fetchMenuData = async () => {
    getRequest("api/menu/" + menuId, (response) => {
      if (response.status == "success") {
        console.log(response)
        console.log(menuId + "heloo")
        setValues(response.data)
      } else {
        Swal.fire({
          icon: "error",
          title: "Somthing went wrong!",
          text: "not good",
        });
      }
    })
  };
  useEffect(() => {
    if (isOpen) {
      fetchMenuData();
    }
  }, [menuId]);
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <ArgonBox component="form" pb={3} px={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                label="Dish name"
                placeholder="Dish name"
                value={values.dishName}
                onChange={(e) => setValues({ ...values, dishName: e.target.value })}
              />
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
                    Dish type
                  </ArgonTypography>
                </ArgonBox>
                <ArgonSelect

                  defaultValue={{ value: "Breakfast", label: "Breakfast" }}
                  options={[
                    { value: "Breakfast", label: "Breakfast" },
                    { value: "Lunch", label: "Lunch" },
                    { value: "Dinner", label: "Dinner" },
                  ]}
                  onChange={(selectedOption) => setValues({ ...values, dishType: selectedOption.value })}
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
                    Meal Category
                  </ArgonTypography>
                </ArgonBox>
                <ArgonSelect

                  defaultValue={{ value: "Main dish", label: "Main dish" }}
                  options={[
                    { value: "Main dish", label: "Main dish" },
                    { value: "Drinks", label: "Drinks" },
                    { value: "Desert", label: "Desert" },
                  ]}
                  onChange={(selectedOption) => setValues({ ...values, mealCategory: selectedOption.value })}
                />
              </ArgonBox>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                label="Price"
                placeholder="20.4"
                value={values.price}
                onChange={(e) => setValues({ ...values, price: e.target.value })}
              />
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
                    Vegan
                  </ArgonTypography>
                </ArgonBox>
                <ArgonSelect

                  defaultValue={{ value: true, label: "vegan" }}
                  options={[
                    { value: false, label: "not vegan" },
                    { value: true, label: "vegan" },
                  ]}
                  onChange={(selectedOption) => setValues({ ...values, vegetarian: selectedOption.value })}
                />
              </ArgonBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormField
                label="Ingredients"
                placeholder="made from pork..."
                value={values.ingredients}
                onChange={(e) => setValues({ ...values, ingredients: e.target.value })}
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
          onClick={editMenu}
        >
          Update
        </ArgonButton>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditModal.propTypes = {
  menuId: PropTypes.number.isRequired,
  data: PropTypes.any.isRequired,
  fetchData: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default EditModal;