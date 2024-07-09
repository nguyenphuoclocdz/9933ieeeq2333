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
import getRequest from "components/API_Get";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

function Pack({ formData, servicepackV, setServicepackV, data, roomV, setRoomV, data_room }) {

  const { formField, values, errors, touched } = formData;
  const { servicepack, room } = formField;


  const [open, setOpen] = useState(false);
  const [room_see, setRoom_see] = useState();
  const [xs_show, setXs_show] = useState(12);
  const [data_elderly, setData_elderly] = useState({
    "elderly_info": []
  });
  useEffect(() => {
    if (data_room.length > 0) {
      handleViewButton();
    }
  }, [data_room]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewButton = () => {
    setOpen(true);
    //setRoom_see(roomName);
    if (data_room.length > 1) {
      setXs_show(6);
    } else {
      setXs_show(12);
    }
  };

  const roomBeds = {};
  data_room.forEach(room => {
    const roomNumber = room.nameRoom.split("-")[0];
    if (!roomBeds[roomNumber]) {
      roomBeds[roomNumber] = [];
    }
    roomBeds[roomNumber].push(room);
  });
  return (

    <ArgonBox>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>List of beds Room</DialogTitle>
        <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {Object.entries(roomBeds).map(([roomNumber, beds], index) => (
            <div key={index}>
              <ArgonBox pt={3}>
                <Typography variant="h6">Room number {roomNumber}</Typography>
              </ArgonBox>
              <ArgonBox pt={3}>
                <Grid container spacing={3}>
                  {beds.map((bed, index) => (
                    <Grid key={index} item xs={6} md={beds.length === 1 ? 12 : 6} onClick={() => {
                      if (bed.status === 0) {
                        setRoomV(bed.nameRoom);
                        setOpen(false);
                      } else {
                        setRoomV("");
                      }
                    }}
                    >
                      <ArgonBox mb={3}>
                        <MiniStatisticsCard
                          bgColor={bed.status === 0 ? "info" : "error"}
                          title={{ text: `BED ${bed.nameRoom}`, fontWeight: "medium" }}
                          count={bed.status === 0 ? "Empty" : "Inhabited"}
                          icon={{ component: "person" }}
                        />
                      </ArgonBox>
                    </Grid>
                  ))}
                </Grid>
              </ArgonBox>
            </div>
          ))}




        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ArgonTypography variant="h5" fontWeight="bold">
        Service Pack
      </ArgonTypography>
      <ArgonBox>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <ArgonTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Service Pack
              </ArgonTypography>
            </ArgonBox>

            <Select
              input={<ArgonInput />}
              name={servicepack.name}
              label={servicepack.label}
              value={servicepackV}
              onChange={setServicepackV}
            >
              <MenuItem value="none">
                -- Select Service --
              </MenuItem>
              {data.map((item, index) => (
                <MenuItem key={index} value={item.packId}>
                  {item.namePack}
                </MenuItem>
              ))}
            </Select>

          </Grid>
        </Grid>
        {data_room.length > 1 && (
          <Grid container spacing={3} style={{ display: "none" }}>
            <Grid item xs={6} sm={6}>
              <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <ArgonTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  Room
                </ArgonTypography>
              </ArgonBox>
              <Select
                input={<ArgonInput />}
                name={room.name}
                label={room.label}
                value={roomV}
              >
                <MenuItem value="none" onClick={() => setOpen(true)}>
                  -- Select Room --
                </MenuItem>
                {data_room.map((item, index) => (
                  item.status === 0 && (
                    <MenuItem key={index} value={item.nameRoom} onClick={() => setOpen(true)}>
                      {item.nameRoom}
                    </MenuItem>
                  )
                ))}
              </Select>
            </Grid>
          </Grid>
        )}



      </ArgonBox>
    </ArgonBox>
  );
}

// typechecking props for Address
Pack.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  servicepackV: PropTypes.string.isRequired,
  setServicepackV: PropTypes.func.isRequired,
  data: PropTypes.func.isRequired,
  roomV: PropTypes.func.isRequired,
  setRoomV: PropTypes.func.isRequired,
  data_room: PropTypes.func.isRequired,
};

export default Pack;
