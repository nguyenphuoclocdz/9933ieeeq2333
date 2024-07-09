package com.example.cssk.Controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Controller
public class QRCodeController {

    // Endpoint to generate and return a QR code image
    @GetMapping(value = "/qr-code/{link}", produces = MediaType.IMAGE_PNG_VALUE)
    public @ResponseBody byte[] getQRCode(@PathVariable String link) throws IOException, WriterException {
        // URL you want to generate QR code for
        String text = "http://172.20.10.5:8080/"+link;
        // Width and height of the QR code
        int width = 500;
        int height = 500;

        // Create a QRCodeWriter instance
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        // Encode the text to create a BitMatrix (2D barcode)
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

        // Create a ByteArrayOutputStream to store the PNG image
        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        // Write the BitMatrix to the ByteArrayOutputStream as a PNG image
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);
        // Convert the ByteArrayOutputStream to a byte array and return it
        return pngOutputStream.toByteArray();
    }
}
