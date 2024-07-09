package com.example.cssk.Controller.Excel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.cssk.Service.Implement.Excel.ExcelExportService;


@RestController
@RequestMapping("/api")
public class ExcelExportController {

    @Autowired
    private ExcelExportService excelExportService;

//    @GetMapping("/exportToExcel")
//    public ResponseEntity<byte[]> exportToExcel() {
//        return excelExportService.exportDataToExcel(3);
//    }
@GetMapping("/exportToExcel/role1")
public ResponseEntity<byte[]> exportToExcelForRole1() {
    try {
        return excelExportService.exportDataToExcelUser(1);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
    @GetMapping("/exportToExcel/role2")
    public ResponseEntity<byte[]> exportToExcelForRole2() {
        try {
            return excelExportService.exportDataToExcelUser(2);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/exportToExcel/role3")
    public ResponseEntity<byte[]> exportToExcelForRole3() {
        try {
            return excelExportService.exportDataToExcelUser(3);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/exportToExcel/role4")
    public ResponseEntity<byte[]> exportToExcelForRole4() {
        try {
            return excelExportService.exportDataToExcelUser(4);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/exportToExcel/role5")
    public ResponseEntity<byte[]> exportToExcelForRole5() {
        try {
            return excelExportService.exportDataToExcelUser(5);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/exportToExcel/role6")
    public ResponseEntity<byte[]> exportToExcelForRole6() {
        try {
            return excelExportService.exportDataToExcelUser(6);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/exportToExcel/role7")
    public ResponseEntity<byte[]> exportToExcelForRole7() {
        try {
            return excelExportService.exportDataToExcelUser(7);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/exportToExcel/elderly")
    public ResponseEntity<byte[]> exportToExcelForElderly() {
        try {
            return excelExportService.exportDataToExcelElderly();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/exportToExcel/menu")
    public ResponseEntity<byte[]> exportToExcelForMenu() {
        try {
            return excelExportService.exportDataToExcelMenu();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/exportToExcel/medicine")
    public ResponseEntity<byte[]> exportToExcelForMedicine() {
        try {
            return excelExportService.exportDataToExcelMedicine();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/exportToExcel/arising")
    public ResponseEntity<byte[]> exportToExcelForServiceArising() {
        try {
            return excelExportService.exportDataToExcelServiceArising();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



}
