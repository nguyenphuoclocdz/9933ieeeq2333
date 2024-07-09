import React, { useEffect, useState } from "react";
import {
    Card,
    Grid,
    Table,
    TableBody,
    TableRow,
    Typography,
    Button,
    Box,
    TableCell,
} from "@mui/material";

import { useParams } from "react-router-dom";
import numeral from "numeral";
import getRequest from "components/API_Get";
import BaseLayout from "../components/BaseLayout";
import PageLayout from "examples/LayoutContainers/PageLayout";

function Invoice() {
    const { id } = useParams();

    const [invoiceData, setInvoiceData] = useState({
        paymentID: '',
        Content: '',
        UserId: '',
        Money: '',
        Status: '',
        Created_at: '',
        service: [],
    });
    useEffect(() => {
        getRequest("/api/payment/" + id, (response) => {
            if (response.status === "success") {
                setInvoiceData(response.data);
                setTimeout(() => {
                    printDiv();
                }, 10);
            } else {
                Swal_show('success', response.message);
            }
        });
    }, []);

    function formatDate(originalDateString) {
        const dateObject = new Date(originalDateString);
        const hours = dateObject.getHours().toString().padStart(2, "0");
        const minutes = dateObject.getMinutes().toString().padStart(2, "0");
        const seconds = dateObject.getSeconds().toString().padStart(2, "0");
        const day = dateObject.getDate().toString().padStart(2, "0");
        const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
        const year = dateObject.getFullYear().toString();

        return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    }

    function printDiv() {
        print();
        close();
    }

    return (
        <PageLayout>
            <Card sx={{
                p: 3,
                border: "1px solid #ccc",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                fontFamily: "'Roboto', sans-serif",
                maxWidth: "800px", // Để giới hạn chiều rộng của Card
                margin: "0 auto", // Để căn giữa Card
            }}>
                {/* Header */}
                <Box mb={4}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item xs={12} md={6}>
                            {/* Logo */}
                            <Box mb={2}>

                            </Box>
                            {/* Text */}
                            <Typography variant="h6" fontWeight="medium" gutterBottom>
                                Vien Duong Lao An Nghi
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                tel: +1 (909) 5678999
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box textAlign={{ xs: "left", md: "right" }}>
                                <Typography variant="h6" fontWeight="medium" gutterBottom>
                                    Billed to: John Doe
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    3231 S Standard Ave
                                    <br />
                                    Orange County
                                    <br />
                                    California
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* Invoice Info */}
                <Box mb={4}>
                    <Grid container justifyContent="space-between">
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" color="textSecondary" fontWeight="medium">
                                Invoice no
                            </Typography>
                            <Typography variant="h5" fontWeight="medium">
                                #{invoiceData.paymentID}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography
                                    variant="h6"
                                    color="textSecondary"
                                    fontWeight="medium"
                                >
                                    Invoice date:
                                </Typography>
                                <Typography variant="h6" fontWeight="medium">
                                    {formatDate(invoiceData.created_at)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                {/* Invoice Table */}
                <Box mb={4}>
                    <Table>
                        <TableBody>
                            {invoiceData.services &&
                                invoiceData.services.map((service, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{service.name}</TableCell>
                                        <TableCell>
                                            {numeral(service.price).format("0,0") + " VNĐ"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            <TableRow>
                                <TableCell variant="footer"><h2>Total</h2></TableCell>
                                <TableCell variant="footer">
                                    <h2>{numeral(invoiceData.money).format("0,0") + " VNĐ"}</h2>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
                {/* QR Code */}
                <Box mb={4}>
                    <Typography align="center">
                        You can scan the QR below to pay
                    </Typography>
                    <Box display="flex" justifyContent="center">
                        <img src={invoiceData.qrdata} alt="QR Code" width="30%" />
                    </Box>
                </Box>

                {/* Footer */}
                <Box textAlign="center">
                    <Typography variant="h5" fontWeight="medium" gutterBottom>
                        Thank you!
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        If you encounter any issues related to the invoice you can contact us
                        at:
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                        support@vienduonglaoannghi.site
                    </Typography>
                </Box>
            </Card>
        </PageLayout>
    );
}

export default Invoice;

