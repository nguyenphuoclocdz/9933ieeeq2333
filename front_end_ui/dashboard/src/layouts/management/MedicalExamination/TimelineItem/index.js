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
import Swal from "sweetalert2";
// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonBadge from "components/ArgonBadge";

// Timeline context
import { useTimeline } from "examples/Timeline/context";

// Custom styles for the TimelineItem
import { timelineItem, timelineItemIcon } from "examples/Timeline/TimelineItem/styles";
import Swal_show from "components/Swal";
import getRequest from "components/API_Get";
import deleteRequest from "components/API_Delete";

function TimelineItem({ color, icon, title, dateTime, description, badges, lastItem,setV,ID, toggleUpdate, fetch}) {
  const isDark = useTimeline();
  const resetValue = () => {
    setV({
      medicalExaminationId: "",
      doctorId: 0,
      elderlyId: 0,
      title: "",
      description: "",
    });
  };
 const handleUpdate= ()=>{
  toggleUpdate();
  fetchStoredME();

 }

 const fetchStoredME =()=>{
getRequest("api/examination/"+ID, (response)=>{
  if (response.status === "success") {
    const newData = response.data
    setV(newData);
    console.log("data tr ve", newData)
  } else {
    Swal_show("error", response.message);
  }
})
}
const deleteME=()=>{
  fetchStoredME();
  deleteRequest("api/examination/"+ID, (response)=>{
    if (response.status === "success") {
      fetch();
    } else {
      Swal_show("error", response.message);
    }
  })
  }
  const handleDelete=()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteME();
        Swal.fire({
          title: "Deleted!",
          text: "The row has been deleted.",
          icon: "success"
        });
      }
    });
  }
  const renderBadges =
    badges.length > 0
      ? badges.map((badge, key) => {
          const badgeKey = `badge-${key}`;

          return (
            <ArgonBox key={badgeKey} mr={key === badges.length - 1 ? 0 : 0.5}>
              <ArgonBadge color={color} size="xs" badgeContent={badge} container />
            </ArgonBox>
          );
        })
      : null;

  return (
    <ArgonBox position="relative" sx={(theme) => timelineItem(theme, { lastItem })}>
      <ArgonBox
        bgColor={isDark ? "dark" : "white"}
        width="1.625rem"
        height="1.625rem"
        borderRadius="50%"
        position="absolute"
        top="3.25%"
        left="2px"
        zIndex={2}
      >
        <Icon sx={(theme) => timelineItemIcon(theme, { color })}>{icon}</Icon>
      </ArgonBox>
     <ArgonBox  display="flex" justifyContent="space-between" alignItems="flex-start">
     <ArgonBox ml={5.75} pt={description ? 0.7 : 0.5} lineHeight={0} maxWidth="30rem">
        <ArgonTypography variant="button" fontWeight="medium" color={isDark ? "white" : "dark"}>
          {title}
        </ArgonTypography>
        <ArgonBox mt={0.5}>
          <ArgonTypography
            variant="caption"
            fontWeight="medium"
            color={isDark ? "secondary" : "text"}
          >
            {dateTime}
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mt={2} mb={1.5}>
          {description ? (
            <ArgonTypography variant="button" fontWeight="regular" color="text">
              {description}
            </ArgonTypography>
          ) : null}
        </ArgonBox>
        {badges.length > 0 ? (
          <ArgonBox display="flex" pb={lastItem ? 1 : 2}>
            {renderBadges}
          </ArgonBox>
        ) : null}
      </ArgonBox>
      <ArgonBox>
      <ArgonBox mx={2} p={1}>
      <ArgonTypography
          variant="body1"
          color="secondary"
          sx={{ cursor: "pointer", lineHeight: 0 }}
        >
          <Tooltip title="Delete" placement="right" onClick={handleDelete} >
            <Icon>delete</Icon>
          </Tooltip>
        </ArgonTypography>
      </ArgonBox>
      <ArgonBox mx={2} p={1}>
      <ArgonTypography
          variant="body1"
          color="secondary"
          sx={{ cursor: "pointer", lineHeight: 0 }}
        >
          <Tooltip title="Edit" placement="right" onClick={handleUpdate} >
            <Icon>edit</Icon>
          </Tooltip>
        </ArgonTypography>
      </ArgonBox>
      </ArgonBox>
     </ArgonBox>
    </ArgonBox>
  );
}

// Setting default values for the props of TimelineItem
TimelineItem.defaultProps = {
  color: "info",
  badges: [],
  lastItem: false,
  description: "",
};

// Typechecking props for the TimelineItem
TimelineItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  description: PropTypes.string,
  badges: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  lastItem: PropTypes.bool,
  setV: PropTypes.func.isRequired,
  ID: PropTypes.number.isRequired,
  toggleUpdate: PropTypes.func.isRequired,
  fetch:PropTypes.func.isRequired,
};

export default TimelineItem;
