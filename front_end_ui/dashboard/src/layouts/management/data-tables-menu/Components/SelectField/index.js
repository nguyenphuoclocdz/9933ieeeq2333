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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonSelect from "components/ArgonSelect";

function SelectField({ label,handleSelectChange, defaultValues, optionsValue, name }) {
  return (
    <ArgonBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
      <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <ArgonTypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}
        </ArgonTypography>
      </ArgonBox>
      <ArgonSelect
              onChange={handleSelectChange}
              name={name}
              defaultValue={defaultValues}
              options={optionsValue}
            />
    </ArgonBox>
  );
}

// Setting default values for the props of FormField
SelectField.defaultProps = {
  label: " ",
};

// Typechecking props for FormField
SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  handleSelectChange: PropTypes.func.isRequired,
  optionsValue: PropTypes.any.isRequired,
  defaultValues: PropTypes.any.isRequired,
};

export default SelectField;
