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

function History({ formData }) {

  const { formField, values, errors, touched } = formData;
  const { history, signs, surgicalHistory, allergyHistory, psychologicalHistory } = formField;
  const { history: historyV, signs: signsV, surgicalHistory: surgicalHistoryV, allergyHistory: allergyHistoryV, psychologicalHistory: psychologicalHistoryV } = values;


  return (
    <ArgonBox>
      <ArgonTypography variant="h5" fontWeight="bold">
        Identification Card
      </ArgonTypography>
      <ArgonBox>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormField
              type={history.type}
              label={history.label}
              name={history.name}
              value={historyV}
              placeholder={history.placeholder}
              error={errors.history && touched.history}
              success={historyV.length > 0 && !errors.history}
            />
          </Grid>
          <Grid item xs={6}>
            <ArgonBox>
              <FormField
                type={signs.type}
                label={signs.label}
                name={signs.name}
                value={signsV}
                placeholder={signs.placeholder}
                error={errors.signs && touched.signs}
                success={signsV.length > 0 && !errors.signs}
              />
            </ArgonBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormField
              type={surgicalHistory.type}
              label={surgicalHistory.label}
              name={surgicalHistory.name}
              value={surgicalHistoryV}
              placeholder={surgicalHistory.placeholder}
              error={errors.surgicalHistory && touched.surgicalHistory}
              success={surgicalHistoryV.length > 0 && !errors.surgicalHistory}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              type={allergyHistory.type}
              label={allergyHistory.label}
              name={allergyHistory.name}
              value={allergyHistoryV}
              placeholder={allergyHistory.placeholder}
              error={errors.allergyHistory && touched.allergyHistory}
              success={allergyHistoryV.length > 0 && !errors.allergyHistory}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormField
              type={psychologicalHistory.type}
              label={psychologicalHistory.label}
              name={psychologicalHistory.name}
              value={psychologicalHistoryV}
              placeholder={psychologicalHistory.placeholder}
              error={errors.psychologicalHistory && touched.psychologicalHistory}
              success={psychologicalHistoryV.length > 0 && !errors.psychologicalHistory}
            />
          </Grid>
        </Grid>
      </ArgonBox>
    </ArgonBox>
  );
}

// typechecking props for Address
History.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default History;
