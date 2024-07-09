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
  const { cardNo, placeOfIssue, placeOfConsultation, dateOfEffect } = formField;
  const { cardNo: cardNoV, placeOfIssue: placeOfIssueV, placeOfConsultation: placeOfConsultationV, dateOfEffect: dateOfEffectV } = values;


  return (
    <ArgonBox>
      <ArgonTypography variant="h5" fontWeight="bold">
        Health insurance card
      </ArgonTypography>
      <ArgonBox>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormField
              type={cardNo.type}
              label={cardNo.label}
              name={cardNo.name}
              value={cardNoV}
              placeholder={cardNo.placeholder}
              error={errors.cardNo && touched.cardNo}
              success={cardNoV.length > 0 && !errors.cardNo}
            />
          </Grid>
          <Grid item xs={6}>
            <ArgonBox>
              <FormField
                type={placeOfConsultation.type}
                label={placeOfConsultation.label}
                name={placeOfConsultation.name}
                value={placeOfConsultationV}
                placeholder={placeOfConsultation.placeholder}
                error={errors.placeOfConsultation && touched.placeOfConsultation}
                success={placeOfConsultationV.length > 0 && !errors.placeOfConsultation}
              />
            </ArgonBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormField
              type={placeOfIssue.type}
              label={placeOfIssue.label}
              name={placeOfIssue.name}
              value={placeOfIssueV}
              placeholder={placeOfIssue.placeholder}
              error={errors.placeOfIssue && touched.placeOfIssue}
              success={placeOfIssueV.length > 0 && !errors.placeOfIssue}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
            inputProps={{ type: "date" }}
              type={dateOfEffect.type}
              label={dateOfEffect.label}
              name={dateOfEffect.name}
              value={dateOfEffectV}
              placeholder={dateOfEffect.placeholder}
              error={errors.dateOfEffect && touched.dateOfEffect}
              success={dateOfEffectV.length > 0 && !errors.dateOfEffect}
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
