package com.example.cssk.Service.Implement.Excel;

import com.example.cssk.Models.*;
import com.example.cssk.Repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ExcelExportService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ElderlyRepository elderlyRepository;
    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private MedicineRepository medicineRepository;
    @Autowired
    private ServiceArisingRepository serviceArisingRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public ResponseEntity<byte[]> exportDataToExcelUser(int role) {
        List<User> userList = userRepository.findByRole(role);

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("User Data");
            Row headerRow = sheet.createRow(0);
            String[] headers = {"UserId", "FullName", "Email", "Username", "Password", "Role", "Phone",
                    "Domicile", "Created_at", "Updated_at"};

            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }
            for (int i = 0; i < userList.size(); i++) {
                Row row = sheet.createRow(i + 1);
                User user = userList.get(i);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                row.createCell(0).setCellValue(user.getUserId());
                row.createCell(1).setCellValue(user.getFullname());
                row.createCell(2).setCellValue(user.getEmail());
                row.createCell(3).setCellValue(user.getUsername());
                row.createCell(4).setCellValue(user.getPassword());
                row.createCell(5).setCellValue(user.getRole());
                row.createCell(6).setCellValue(user.getPhone());
                row.createCell(7).setCellValue(user.getDomicile());
//                row.createCell(8).setCellValue(user.getKeyFaceId());
//                row.createCell(9).setCellValue(user.getSecretKey());
                row.createCell(8).setCellValue(user.getCreated_at() != null ? user.getCreated_at().format(formatter) : "");
                row.createCell(9).setCellValue(user.getUpdated_at() != null ? user.getUpdated_at().format(formatter) : "");
            }
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));

            switch ( role){
                case 1: String role1 = "Admin.xlsx";
                    responseHeaders.setContentDispositionFormData(role1, role1);
                    break;
                case 2: String role2 = "User.xlsx";
                    responseHeaders.setContentDispositionFormData(role2, role2);
                    break;
                case 3: String role3 = "Doctor.xlsx";
                    responseHeaders.setContentDispositionFormData(role3, role3);
                    break;
                case 4: String role4 = "Nurse.xlsx";
                    responseHeaders.setContentDispositionFormData(role4, role4);
                    break;
                case 5: String role5 = "HR.xlsx";
                    responseHeaders.setContentDispositionFormData(role5, role5);
                    break;
                case 6: String role6 = "Accountant.xlsx";
                    responseHeaders.setContentDispositionFormData(role6, role6);
                    break;
                case 7: String role7 = "Pharmacist.xlsx";
                    responseHeaders.setContentDispositionFormData(role7, role7);
                    break;
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);

            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(outputStream.toByteArray());

        } catch (IOException e) {
            throw new RuntimeException("Error exporting data to Excel: " + e.getMessage());
        }
    }
    public ResponseEntity<byte[]> exportDataToExcelElderly() {
        List<Elderly> elderlyList = elderlyRepository.findAll();
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("elderly Data");
            Row headerRow = sheet.createRow(0);
            String[] headers = {"elderlyId", "userId", "fullNameElderly", "birthdayElderly", "genderElderly", "resident",
                    "domicile" , "serviceId", "roomName", "status" ,"relative", "created_at", "updated_at"};
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }
            for (int i = 0; i < elderlyList.size(); i++) {
                Row row = sheet.createRow(i + 1);
                Elderly elderly = elderlyList.get(i);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                row.createCell(0).setCellValue(elderly.getElderlyId());
                row.createCell(1).setCellValue(elderly.getUserId());
                row.createCell(2).setCellValue(elderly.getFullNameElderly());
                row.createCell(3).setCellValue(elderly.getBirthdayElderly() != null ? elderly.getBirthdayElderly().format(dateFormatter) : "");
                row.createCell(4).setCellValue(elderly.getGenderElderly());
                row.createCell(5).setCellValue(elderly.getResident());
                row.createCell(6).setCellValue(elderly.getDomicile());
                if (elderly.getServiceId() != null) {
                    if (elderly.getServiceId() == 1) {
                        row.createCell(7).setCellValue("MASSAGE THÁI");
                    } else if (elderly.getServiceId() == 2) {
                        row.createCell(7).setCellValue("MASSAGE THÁI 2");
                    } else if (elderly.getServiceId() == 3) {
                        row.createCell(7).setCellValue("MASSAGE THÁI 3");
                    }
                }

                row.createCell(8).setCellValue(elderly.getRoomName());
                row.createCell(9).setCellValue(elderly.getStatus() == 0 ? "AWAITING REVIEW" : "LIVE IN");

                row.createCell(10).setCellValue(elderly.getResident());
                row.createCell(11).setCellValue(elderly.getCreated_at() != null ? elderly.getCreated_at().format(formatter) : "");
                row.createCell(12).setCellValue(elderly.getUpdated_at() != null ? elderly.getUpdated_at().format(formatter) : "");

            }

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            String elderly = "elderly.xlsx";
            responseHeaders.setContentDispositionFormData(elderly, elderly);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);

            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(outputStream.toByteArray());

        } catch (IOException e) {
            throw new RuntimeException("Error exporting data to Excel: " + e.getMessage());
        }
    }
    public ResponseEntity<byte[]> exportDataToExcelMenu() {
        List<Menu> menuList = menuRepository.findAll();

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Menu Data");
            Row headerRow = sheet.createRow(0);
            String[] headers = {"menuId", "dishName", "dishType", "mealCategory", "price", "isVegetarian", "ingredients", "disable"
                    , "Created_at", "Updated_at"};

            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }
            for (int i = 0; i < menuList.size(); i++) {
                Row row = sheet.createRow(i + 1);
                Menu menu = menuList.get(i);

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                row.createCell(0).setCellValue(menu.getMenuId());
                row.createCell(1).setCellValue(menu.getDishName());
                row.createCell(2).setCellValue(menu.getDishType());
                row.createCell(3).setCellValue(menu.getMealCategory());
                row.createCell(4).setCellValue(menu.getPrice());
                Cell booleanCell = row.createCell(5);
                if (menu.isVegetarian()) {
                    booleanCell.setCellValue("VEGAEN");
                } else {
                    booleanCell.setCellValue("CANIVORE");
                }
                row.createCell(6).setCellValue(menu.getIngredients());
                Cell booleanDisable = row.createCell(7);
                if (menu.isDisable()) {
                    booleanDisable.setCellValue("true");
                } else {
                    booleanDisable.setCellValue("false");
                }
                row.createCell(8).setCellValue(menu.getCreated_at() != null ? menu.getCreated_at().format(formatter) : "");
                row.createCell(9).setCellValue(menu.getUpdated_at() != null ? menu.getUpdated_at().format(formatter) : "");


            }

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));

            String menu = "menu.xlsx";
            responseHeaders.setContentDispositionFormData(menu, menu);


            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);

            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(outputStream.toByteArray());

        } catch (IOException e) {
            throw new RuntimeException("Error exporting data to Excel: " + e.getMessage());
        }


    }

    public ResponseEntity<byte[]> exportDataToExcelMedicine() {
        List<Medicine> medicineList = medicineRepository.findAll();
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("medicine Data");
            Row headerRow = sheet.createRow(0);
            String[] headers = {"medicineId", "drugName", "form", "quantity", "expiryDate", "sideEffects", "indications",
                    "contraindications" , "price", "created_at", "updated_at"};
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }
            for (int i = 0; i < medicineList.size(); i++) {
                Row row = sheet.createRow(i + 1);
                Medicine medicine = medicineList.get(i);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                row.createCell(0).setCellValue(medicine.getMedicineId());
                row.createCell(1).setCellValue(medicine.getDrugName());
                row.createCell(2).setCellValue(medicine.getForm());
                row.createCell(3).setCellValue(medicine.getQuantity());
                row.createCell(4).setCellValue(medicine.getExpiryDate() != null ? medicine.getExpiryDate().format(dateFormatter) : "");
                row.createCell(5).setCellValue(medicine.getSideEffects());
                row.createCell(6).setCellValue(medicine.getIndications());
                row.createCell(7).setCellValue(medicine.getContraindications());
                row.createCell(8).setCellValue(medicine.getPrice());
                row.createCell(9).setCellValue(medicine.getCreated_at() != null ? medicine.getCreated_at().format(formatter) : "");
                row.createCell(10).setCellValue(medicine.getUpdated_at() != null ? medicine.getUpdated_at().format(formatter) : "");

            }

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            String elderly = "medicine.xlsx";
            responseHeaders.setContentDispositionFormData(elderly, elderly);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);

            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(outputStream.toByteArray());

        } catch (IOException e) {
            throw new RuntimeException("Error exporting data to Excel: " + e.getMessage());
        }
    }
    public ResponseEntity<byte[]> exportDataToExcelServiceArising() {
        List<ServicesArising> arisingList = serviceArisingRepository.findAll();
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("medicine Data");
            Row headerRow = sheet.createRow(0);
            String[] headers = {"servicesArisingId", "elderlyId", "service", "money", "time", "status"};
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }
            for (int i = 0; i < arisingList.size(); i++) {
                Row row = sheet.createRow(i + 1);
                ServicesArising arising = arisingList.get(i);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

                DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                row.createCell(0).setCellValue(arising.getServicesArisingId());
                row.createCell(1).setCellValue(arising.getElderlyId());
                row.createCell(2).setCellValue(arising.getService());
                row.createCell(3).setCellValue(arising.getMoney());
                row.createCell(4).setCellValue(arising.getTime() != null ? arising.getTime().format(dateFormatter) : "");
                Cell booleanStatus = row.createCell(5);
                if (arising.isStatus()) {
                    booleanStatus.setCellValue("true");
                } else {
                    booleanStatus.setCellValue("false");
                }
            }

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            String elderly = "arising.xlsx";
            responseHeaders.setContentDispositionFormData(elderly, elderly);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);

            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(outputStream.toByteArray());

        } catch (IOException e) {
            throw new RuntimeException("Error exporting data to Excel: " + e.getMessage());
        }
    }

}
