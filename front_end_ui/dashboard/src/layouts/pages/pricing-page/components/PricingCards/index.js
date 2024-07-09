import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import ArgonBox from "components/ArgonBox";

import DefaultPricingCard from "examples/Cards/PricingCards/DefaultPricingCard";

function PricingCards({ packs }) {
  const navigate = useNavigate();
  const formatToVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };
  if (!packs || !Array.isArray(packs) || packs.length === 0) {
    return null;
  }
  return (
    <ArgonBox position="relative" zIndex={10} mt={-18} px={{ xs: 1, sm: 0 }}>
      <Grid container spacing={3} justifyContent="center">
        {packs.map((pack) => ( 
          <Grid item xs={12} lg={4} key={pack.packId}>
            <DefaultPricingCard
              title={pack.namePack}
              price={{ value: formatToVND(pack.money)+"/Month", currency: "" }}
              specifications={pack.serviceDetail.map((detail) => ({
                label: detail,
                includes: true
              }))}
              action={{
                type: "internal",
                route: "/",
                color: "dark",
                label: "Join",
                onClick: () => navigate('/')
              }}
            />
          </Grid>
        ))}
      </Grid>
    </ArgonBox>
  );
}
PricingCards.propTypes = {
  packs: PropTypes.arrayOf(
    PropTypes.shape({
      packId: PropTypes.number.isRequired,
      namePack: PropTypes.string.isRequired,
      money: PropTypes.number.isRequired,
      serviceDetail: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default PricingCards;
