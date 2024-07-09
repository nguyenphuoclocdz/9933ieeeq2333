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

import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonEditor from "components/ArgonEditor";
import ArgonSelect from "components/ArgonSelect";

// NewProduct page components
import FormField from "layouts/ecommerce/products/new-elderly/components/FormField";
import { TextField } from "@mui/material";
import PropTypes from 'prop-types';

function ProductInfo({ handleInputChange, handleSelectChange }) {
  const [editorValue, setEditorValue] = useState(
    "<p>Some initial <strong>bold</strong> text</p><br><br><br>"
  );

  return (
    <ArgonBox>
      <ArgonTypography variant="h5">Elderly Information</ArgonTypography>
      <ArgonBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="name" name="name" placeholder="eg. Nguyen Van A" onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="birthday" name="birthday" placeholder="eg. 65" onChange={handleInputChange} />
          </Grid>
        </Grid>
      </ArgonBox>
      <ArgonBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <ArgonTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Gender
              </ArgonTypography>
            </ArgonBox>
            <ArgonSelect
              onChange={handleSelectChange}
              name="gender"
              defaultValue={{ value: "Male", label: "Male" }}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" }
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="resident" name="resident" placeholder="eg. Can Tho" onChange={handleInputChange} />
          </Grid>
        </Grid>
      </ArgonBox>
      <ArgonBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="domicile" name="domicile" placeholder="eg. Ho Chi Minh" onChange={handleInputChange} />
          </Grid>
        </Grid>
      </ArgonBox>
    </ArgonBox>
  );
}
ProductInfo.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired
};
export default ProductInfo;
