import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import ArgonBox from "components/ArgonBox";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Header from "layouts/pages/pricing-page/components/Header";
import PricingCards from "layouts/pages/pricing-page/components/PricingCards";
import getRequest from "components/API_Get";

function PricingPage() {
  const [tabValue, setTabValue] = useState(0);
  const [packs, setPacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        getRequest("/api/pack", (response) => {
          if (response.status === 'success') {
            setPacks(response.data); // Truy cập vào thuộc tính data của đối tượng trả về
          } else {
            console.error("API request failed with message:", response.message);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  

  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <PageLayout>
      <Header tabValue={tabValue} tabHandler={handleSetTabValue} />
      <Container>
        <PricingCards packs={packs} />
      </Container>
      <ArgonBox mt={8} />
    </PageLayout>
  );
}

export default PricingPage;
