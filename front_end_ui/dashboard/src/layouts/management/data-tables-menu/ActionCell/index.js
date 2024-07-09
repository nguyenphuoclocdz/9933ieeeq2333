// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import BlockIcon from '@mui/icons-material/Block';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import deleteRequest from "components/API_Delete";
import Swal from "sweetalert2";
import putRequest from "components/API_Put";
function ActionCell({ setMenuIDValue, idValue, setOpen,fetchData, isDisable}) {

  const takeIdOnClicked = ()=>{
    setMenuIDValue(idValue);
    setOpen(true);
  }
  const deleteMenu = async () => {
    deleteRequest("api/menu/"+idValue,(response)=>{
      console.log(response);
      if (response.status == "success") {
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
  const disableMenu = async () => {
    putRequest("api/menu/disable/"+idValue,null,(response)=>{
      console.log(response);
      if (response.status === "success"){
        fetchData();
      } else{
        Swal.fire({
          icon: "error",
          title: "Somthing went wrong!",
          text: "not good",
        });
      }
    })
  };
  const setIdDelete = ()=>{
    setMenuIDValue(idValue);
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
        deleteMenu();
        Swal.fire({
          title: "Deleted!",
          text: "The row has been deleted.",
          icon: "success"
        });
      }
    });
  };
  const setDisable = ()=>{
    setMenuIDValue(idValue);
    Swal.fire({
      title: "Are you sure?",
      text:   isDisable === true ? "you are going to unable this row" : "you are going to disable this row",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:  isDisable === true ? "Yes, unable this" : "Yes, disable it!"
    }).then((result) => {
      if (result.isConfirmed) {
        disableMenu();
       
        Swal.fire({
          title: isDisable === true ? "Unable" : "Disable",
          text: isDisable === true ? "The row has been unabled" : "The row has been disabled.",
          icon: "success"
        });
        fetchData();
      }
    });
  };
  const role = localStorage.getItem('role');
  return (
    <ArgonBox display="flex" alignItems="center">
     {role == 1 && (
        <ArgonTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
          <Tooltip title={isDisable === true ? "Enable" : "Disable"} placement="left" onClick={setDisable}>
          {isDisable ?  <WifiProtectedSetupIcon/> :<BlockIcon />}
          </Tooltip>
        </ArgonTypography>
      )}
      
      <ArgonBox mx={2}>
      <ArgonTypography
          variant="body1"
          color="secondary"
          sx={{ cursor: "pointer", lineHeight: 0 }}
        >
          <Tooltip title="Edit" placement="top" onClick={takeIdOnClicked}>
            <Icon>edit</Icon>
          </Tooltip>
        </ArgonTypography>
      </ArgonBox>
      <Link to="" style={{ textDecoration: "none" }}>
      <ArgonTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Tooltip title="Delete" placement="top" onClick={setIdDelete}>
          <Icon>delete</Icon>
        </Tooltip>
      </ArgonTypography>
      </Link>
    </ArgonBox>
    
  );
}

ActionCell.propTypes = {
  idValue: PropTypes.number.isRequired,
  setMenuIDValue: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  isDisable: PropTypes.bool.isRequired,
};
export default ActionCell;