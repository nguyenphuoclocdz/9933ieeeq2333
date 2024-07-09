// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

function MenuCell({ image, name}) {
  return (
    <ArgonBox display="flex" alignItems="center">
      
      <ArgonBox mx={2} width="3.75rem">
        <ArgonBox component="img" src={image} alt={name} width="100%" />
      </ArgonBox>
      <ArgonTypography variant="button" fontWeight="medium">
        {name}
      </ArgonTypography>
    </ArgonBox>
  );
}


// Typechecking props for the ProductCell
MenuCell.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MenuCell;
