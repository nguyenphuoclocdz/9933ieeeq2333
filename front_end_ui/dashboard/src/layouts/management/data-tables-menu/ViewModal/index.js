import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import postRequest from "components/API_Post";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import FormField from "layouts/account/components/FormField";
import PropTypes, { bool } from "prop-types";
import ArgonTypography from "components/ArgonTypography";
import ArgonSelect from "components/ArgonSelect";
const AddNewModal = ({ data, setData, isOpen, handleClose, addData, handleSelectChange }) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Add</DialogTitle>
      <DialogContent>
        <ArgonBox component="form" pb={3} px={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                label="Dish name"
                placeholder="Dish name"
                onChange={(e) => setData({ ...data, dishName: e.target.value })}
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
                  onChange={(selectedOption) => setData({ ...data, dishType: selectedOption.value })}
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
                  onChange={(selectedOption) => setData({ ...data, mealCategory: selectedOption.value })}
                />
              </ArgonBox>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                label="Price"
                placeholder="20.4"
                onChange={(e) => setData({ ...data, price: e.target.value })}
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

                  defaultValue={{ value: true, label: "true" }}
                  options={[
                    { value: false, label: "false" },
                    { value: true, label: "true" },
                  ]}
                  onChange={(selectedOption) => setData({ ...data, vegetarian: selectedOption.value })}
                />
              </ArgonBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormField
                label="Ingredients"
                placeholder="made from pork..."
                onChange={(e) => setData({ ...data, ingredients: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={12}></Grid>
          </Grid>
        </ArgonBox>
      </DialogContent>
      <DialogActions>
        <ArgonButton variant="gradient" color="dark" size="medium" type="submit" onClick={addData}>
          Add
        </ArgonButton>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddNewModal.propTypes = {
  data: PropTypes.any.isRequired,
  setData: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addData: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
};

export default AddNewModal;
