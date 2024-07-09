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

import { useState } from "react";

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";

// NewUser page components
import FormField from "layouts/elderly/new-elderly/components/FormField";

function HIC({ formData }) {

  const { formField, values, errors, touched } = formData;
  const { cardNoID, placeOfOrigin, placeOfResidence, placeOfIssueID, dateOfIssue, expiredDate } = formField;
  const { cardNoID: cardNoIDV, placeOfOrigin: placeOfOriginV, placeOfResidence: placeOfResidenceV, placeOfIssueID: placeOfIssueIDV, dateOfIssue: dateOfIssueV, expiredDate: expiredDateV } = values;


  return (
    <ArgonBox>
      <ArgonTypography variant="h5" fontWeight="bold">
        Identification Card
      </ArgonTypography>
      <ArgonBox>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormField
              type={cardNoID.type}
              label={cardNoID.label}
              name={cardNoID.name}
              value={cardNoIDV}
              placeholder={cardNoID.placeholder}
              error={errors.cardNoID && touched.cardNoID}
              success={cardNoIDV.length > 0 && !errors.cardNoID}
            />
          </Grid>
          <Grid item xs={6}>
            <ArgonBox>
              <FormField
                type={placeOfOrigin.type}
                label={placeOfOrigin.label}
                name={placeOfOrigin.name}
                value={placeOfOriginV}
                placeholder={placeOfOrigin.placeholder}
                error={errors.placeOfOrigin && touched.placeOfOrigin}
                success={placeOfOriginV.length > 0 && !errors.placeOfOrigin}
              />
            </ArgonBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormField
              type={placeOfResidence.type}
              label={placeOfResidence.label}
              name={placeOfResidence.name}
              value={placeOfResidenceV}
              placeholder={placeOfResidence.placeholder}
              error={errors.placeOfResidence && touched.placeOfResidence}
              success={placeOfResidenceV.length > 0 && !errors.placeOfResidence}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              type={placeOfIssueID.type}
              label={placeOfIssueID.label}
              name={placeOfIssueID.name}
              value={placeOfIssueIDV}
              placeholder={placeOfIssueID.placeholder}
              error={errors.placeOfIssueID && touched.placeOfIssueID}
              success={placeOfIssueIDV.length > 0 && !errors.placeOfIssueID}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormField
            inputProps={{ type: "date" }}
              type={dateOfIssue.type}
              label={dateOfIssue.label}
              name={dateOfIssue.name}
              value={dateOfIssueV}
              placeholder={dateOfIssue.placeholder}
              error={errors.dateOfIssue && touched.dateOfIssue}
              success={dateOfIssueV.length > 0 && !errors.dateOfIssue}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
            inputProps={{ type: "date" }}
              type={expiredDate.type}
              label={expiredDate.label}
              name={expiredDate.name}
              value={expiredDateV}
              placeholder={expiredDate.placeholder}
              error={errors.expiredDate && touched.expiredDate}
              success={expiredDateV.length > 0 && !errors.expiredDate}
            />
          </Grid>
        </Grid>
      </ArgonBox>
    </ArgonBox>
  );
}

// typechecking props for Address
HIC.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default HIC;
