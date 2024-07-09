package com.example.cssk.Controller.Excel;

import com.example.cssk.Service.Implement.Excel.ExcelImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/excel")
public class ExcelImportController {

    @Autowired
    private ExcelImportService excelImportService;

    @PostMapping("/import")
    public ResponseEntity<String> importExcel(@RequestParam("file") MultipartFile file) {
        try {
            excelImportService.importDataFromExcel(file);
            return ResponseEntity.ok("The Excel file has been imported successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when importing Excel file " + e.getMessage());
        }
    }
    @PostMapping("/importElerly")
    public ResponseEntity<String> importElderlyExcel(@RequestParam("file") MultipartFile file) {
        try {
            excelImportService.importDataElderlyFromExcel(file);
            return ResponseEntity.ok("The Excel file has been imported successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when importing Excel file " + e.getMessage());
        }
    }
    @PostMapping("/importMenu")
    public ResponseEntity<String> importMenuExcel(@RequestParam("file") MultipartFile file) {
        try {
            excelImportService.importDataMenuFromExcel(file);
            return ResponseEntity.ok("The Excel file has been imported successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when importing Excel file" + e.getMessage());
        }
    }
    @PostMapping("/importMedicine")
    public ResponseEntity<String> importMedicineExcel(@RequestParam("file") MultipartFile file) {
        try {
            excelImportService.importDataMedicineFromExcel(file);
            return ResponseEntity.ok("The Excel file has been imported successfully");
        } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when importing Excel file: " + e.getMessage());
        }
    }
    @PostMapping("/importArising")
    public ResponseEntity<String> importArisingExcel(@RequestParam("file") MultipartFile file) {
        try {
            excelImportService.importDataServiceArisingFromExcel(file);
            return ResponseEntity.ok("The Excel file has been imported successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when importing Excel file: " + e.getMessage());
        }
    }
}
