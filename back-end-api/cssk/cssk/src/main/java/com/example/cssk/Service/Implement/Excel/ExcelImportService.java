package com.example.cssk.Service.Implement.Excel;

import com.example.cssk.Models.*;
import com.example.cssk.Repository.*;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Date;
import java.util.Iterator;
import java.util.Optional;

@Service
public class ExcelImportService {

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

    public void importDataFromExcel(MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                if (row.getRowNum() == 0) {
                    continue;
                }

                // DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                User userData = new User();
                userData.setUserId(getLongCellValue(row.getCell(0)));
                userData.setFullname(getStringCellValue(row.getCell(1)));
                userData.setEmail(getStringCellValue(row.getCell(2)));
                userData.setUsername(getStringCellValue(row.getCell(3)));
                userData.setPassword(getStringCellValue(row.getCell(4)));
                userData.setRole(getIntCellValue(row.getCell(5)));
                userData.setPhone(getStringCellValue(row.getCell(6)));
                userData.setDomicile(getStringCellValue(row.getCell(7)));
//                userData.setKeyFaceId(getStringCellValue(row.getCell(8)));
//                userData.setSecretKey(getStringCellValue(row.getCell(9)));
                userData.setCreated_at(getLocalDateTimeCellValue(row.getCell(8)));
                userData.setUpdated_at(getLocalDateTimeCellValue(row.getCell(9)));
//


                // Check if the data already exists in the database
                Optional<User> existingUser = userRepository.findById(userData.getUserId());
                if (existingUser.isPresent()) {User existingUserData = existingUser.get();
                    existingUserData.setFullname(userData.getFullname());
                    existingUserData.setEmail(userData.getEmail());
                    existingUserData.setUsername(userData.getUsername());
                    existingUserData.setPassword(userData.getPassword());
                    existingUserData.setRole(userData.getRole() );
                    existingUserData.setPhone(userData.getPhone() );
                    existingUserData.setDomicile(userData.getDomicile() );
//                    existingUserData.setKeyFaceId(userData.getKeyFaceId());
//                    existingUserData.setSecretKey(userData.getSecretKey());
                    existingUserData.setCreated_at(userData.getCreated_at());
                    existingUserData.setUpdated_at(userData.getUpdated_at());
                    userRepository.save(existingUserData);
                } else {
                    userRepository.save(userData);
                }
            }

            workbook.close();
        } catch (IOException e) {
            throw new RuntimeException("Fail processing: " + e.getMessage());
        }
    }
    public void importDataElderlyFromExcel(MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();
            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                if (row.getRowNum() == 0) {
                    continue;
                }
                Elderly elderlyData = new Elderly();
                elderlyData.setElderlyId(getLongCellValue(row.getCell(0)));
                elderlyData.setUserId(getLongCellValue(row.getCell(1)));
                elderlyData.setFullNameElderly(getStringCellValue(row.getCell(2)));
                elderlyData.setBirthdayElderly(getLocalDateTimeCellValue2(row.getCell(3)));
                elderlyData.setGenderElderly(getStringCellValue(row.getCell(4)));
                elderlyData.setResident(getStringCellValue(row.getCell(5)));
                elderlyData.setDomicile(getStringCellValue(row.getCell(6)));
                elderlyData.setServiceId(
                        "MASSAGE THÁI".equals(getStringCellValue(row.getCell(7))) ? Long.valueOf(1) :
                                "MASSAGE THÁI 2".equals(getStringCellValue(row.getCell(7))) ? Long.valueOf(2) :
                                        "MASSAGE THÁI 3".equals(getStringCellValue(row.getCell(7))) ? Long.valueOf(3) : null
                );
                elderlyData.setRoomName(getStringCellValue(row.getCell(8)));
                elderlyData.setStatus("AWAITING REVIEW".equals(getStringCellValue(row.getCell(9))) ? 0 : ("LIVE IN".equals(getStringCellValue(row.getCell(9))) ? 1 : 2));
                elderlyData.setRelative(getStringCellValue(row.getCell(10)));
                elderlyData.setCreated_at(getLocalDateTimeCellValue(row.getCell(11)));
                elderlyData.setUpdated_at(getLocalDateTimeCellValue(row.getCell(12)));
//

                // Check if the data already exists in the database
                Optional<Elderly> existingElderly = elderlyRepository.findById(elderlyData.getElderlyId());
                if (existingElderly.isPresent()) {
                    Elderly existingElderlyData = existingElderly.get();
                    existingElderlyData.setUserId(elderlyData.getUserId());
                    existingElderlyData.setFullNameElderly(elderlyData.getFullNameElderly());
                    existingElderlyData.setBirthdayElderly(elderlyData.getBirthdayElderly());
                    existingElderlyData.setGenderElderly(elderlyData.getGenderElderly());
                    existingElderlyData.setResident(elderlyData.getResident() );
                    existingElderlyData.setDomicile(elderlyData.getDomicile() );
                    existingElderlyData.setServiceId(elderlyData.getServiceId());
                    existingElderlyData.setRoomName(elderlyData.getRoomName());
                    existingElderlyData.setStatus(elderlyData.getStatus());
                    existingElderlyData.setRelative(elderlyData.getRelative());
                    existingElderlyData.setCreated_at(elderlyData.getCreated_at());
                    existingElderlyData.setUpdated_at(elderlyData.getUpdated_at());
                    elderlyRepository.save(existingElderlyData);

                } else {
                    elderlyRepository.save(elderlyData);
                }
            }

            workbook.close();
        } catch (IOException e) {
            throw new RuntimeException("Fail processing: " + e.getMessage());
        }
    }
    public void importDataMenuFromExcel(MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();

                // Bỏ qua dòng tiêu đề
                if (row.getRowNum() == 0) {
                    continue;
                }

                Menu menuData = new Menu();
                menuData.setMenuId(getLongCellValue(row.getCell(0)));
                menuData.setDishName(getStringCellValue(row.getCell(1)));
                menuData.setDishType(getStringCellValue(row.getCell(2)));
                menuData.setMealCategory(getStringCellValue(row.getCell(3)));
                menuData.setPrice(getLongCellValue(row.getCell(4)));
                menuData.setVegetarian(getStringCellValue(row.getCell(5)).equalsIgnoreCase("VEGAEN"));
                menuData.setIngredients(getStringCellValue(row.getCell(6)));
//                menuData.setDisable(getStringCellValue(row.getCell(7)).equalsIgnoreCase("TRUE") ||
//                        getStringCellValue(row.getCell(7)).equalsIgnoreCase("true"));
                menuData.setDisable(getBooleanCellValue(row.getCell(7)));

                menuData.setCreated_at(getLocalDateTimeCellValue(row.getCell(8)));
                    menuData.setUpdated_at(getLocalDateTimeCellValue(row.getCell(9)));


                // Check if the data already exists in the database
                Optional<Menu> existingMenu = menuRepository.findById(menuData.getMenuId());
                if (existingMenu.isPresent()) {
                    // If the data already exists, you can choose to update the data or ignore it
                    // Example: userRepository.save(userData); // Update user information
                    Menu existingMenuData = existingMenu.get();
                    // Update user information with new data
                    existingMenuData.setMenuId(menuData.getMenuId());
                    existingMenuData.setDishName(menuData.getDishName());
                    existingMenuData.setDishType(menuData.getDishType());
                    existingMenuData.setMealCategory(menuData.getMealCategory());
                    existingMenuData.setPrice(menuData.getPrice() );
                    existingMenuData.setVegetarian(menuData.isVegetarian() );
                    existingMenuData.setIngredients(menuData.getIngredients());
                    existingMenuData.setDisable(menuData.isDisable());
                    existingMenuData.setCreated_at(menuData.getCreated_at());
                    existingMenuData.setUpdated_at(menuData.getUpdated_at());
                    // Save updated user information to the database
                    menuRepository.save(existingMenuData);

                } else {
                    // If the data does not exist, then save it to the database
                    menuRepository.save(menuData);
                }
            }

            workbook.close();
        } catch (IOException e) {
            throw new RuntimeException("Fail processing: " + e.getMessage());
        }
    }

    public void importDataMedicineFromExcel(MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();

                // Ignore the subject line
                if (row.getRowNum() == 0) {
                    continue;
                }

                Medicine medicineData = new Medicine();
                medicineData.setMedicineId(getLongCellValue(row.getCell(0)));
                medicineData.setDrugName(getStringCellValue(row.getCell(1)));
                medicineData.setForm(getStringCellValue(row.getCell(2)));
                medicineData.setQuantity(getIntCellValue(row.getCell(3)));
                medicineData.setExpiryDate(getLocalDateTimeCellValue2(row.getCell(4)));
                medicineData.setSideEffects(getStringCellValue(row.getCell(5)));
                medicineData.setIndications(getStringCellValue(row.getCell(6)));
                medicineData.setContraindications(getStringCellValue(row.getCell(7)));
                medicineData.setPrice(getDoubleCellValue(row.getCell(8)));
                medicineData.setCreated_at(getLocalDateTimeCellValue(row.getCell(9)));
                medicineData.setUpdated_at(getLocalDateTimeCellValue(row.getCell(10)));

                Optional<Medicine> existingMedicine = medicineRepository.findById(medicineData.getMedicineId());
                if (existingMedicine.isPresent()) {
                    // If the data already exists, you can choose to update the data or ignore it
                    // Example: userRepository.save(userData); // Update user information
                    Medicine existingMedicineData = existingMedicine.get();
                    // Update thông tin người dùng với dữ liệu mới
                    existingMedicineData.setMedicineId(medicineData.getMedicineId());
                    existingMedicineData.setDrugName(medicineData.getDrugName());
                    existingMedicineData.setForm(medicineData.getForm());
                    existingMedicineData.setQuantity(medicineData.getQuantity());
                    existingMedicineData.setExpiryDate(medicineData.getExpiryDate());
                    existingMedicineData.setSideEffects(medicineData.getSideEffects());
                    existingMedicineData.setIndications(medicineData.getIndications());
                    existingMedicineData.setContraindications(medicineData.getContraindications());
                    existingMedicineData.setPrice(medicineData.getPrice());
                    existingMedicineData.setCreated_at(medicineData.getCreated_at());
                    existingMedicineData.setUpdated_at(medicineData.getUpdated_at());
                    // Save updated user information to the database
                    medicineRepository.save(existingMedicineData);

                } else {
                    // If the data does not exist, then save it to the database
                    medicineRepository.save(medicineData);
                }

            }

            workbook.close();
        } catch (IOException e) {
            throw new RuntimeException("Fail processing: " + e.getMessage());
        }
    }
    public void importDataServiceArisingFromExcel(MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();

                // Ignore the subject line
                if (row.getRowNum() == 0) {
                    continue;
                }

                ServicesArising arisingData = new ServicesArising();
                arisingData.setServicesArisingId(getLongCellValue(row.getCell(0)));
                arisingData.setElderlyId(getLongCellValue(row.getCell(1)));
                arisingData.setService(getStringCellValue(row.getCell(2)));
                arisingData.setMoney(getLongCellValue(row.getCell(3)));
                arisingData.setTime(getLocalDateTimeCellValue2(row.getCell(4)));
                arisingData.setStatus(getBooleanCellValue(row.getCell(5)));


                Optional<ServicesArising> existingArsing = serviceArisingRepository.findById(arisingData.getServicesArisingId());
                if (existingArsing.isPresent()) {
                    // If the data already exists, you can choose to update the data or ignore it
                    // Example: userRepository.save(userData); // Update user information
                    ServicesArising existingArisingData = existingArsing.get();
                    // Update thông tin người dùng với dữ liệu mới
                    existingArisingData.setServicesArisingId(arisingData.getServicesArisingId());
                    existingArisingData.setElderlyId(arisingData.getElderlyId());
                    existingArisingData.setService(arisingData.getService());
                    existingArisingData.setMoney(arisingData.getMoney());
                    existingArisingData.setTime(arisingData.getTime());
                    existingArisingData.setStatus(arisingData.isStatus());

                    // Save updated user information to the database
                    serviceArisingRepository.save(existingArisingData);

                } else {
                    // If the data does not exist, then save it to the database
                    serviceArisingRepository.save(arisingData);
                }

            }

            workbook.close();
        } catch (IOException e) {
            throw new RuntimeException("Fail processing: " + e.getMessage());
        }
    }

    private String getStringCellValue(Cell cell) {
        if (cell == null) {
            return null;
        }

        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    return String.valueOf((long) cell.getNumericCellValue());
                }
            default:
                return null;
        }
    }

    private Long getLongCellValue(Cell cell) {
        if (cell == null) {
            return null;
        }

        switch (cell.getCellType()) {
            case STRING:
                return Long.parseLong(cell.getStringCellValue());
            case NUMERIC:
                return (long) cell.getNumericCellValue();
            default:
                return null;
        }
    }

    private Date getDateCellValue(Cell cell) {
        if (cell == null || cell.getCellType() == CellType.BLANK) {
            return null;
        }

        switch (cell.getCellType()) {
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue();
                }
                break;
            case STRING:
                try {
                    return new SimpleDateFormat("yyyy-MM-dd").parse(cell.getStringCellValue());
                } catch (ParseException e) {
                    e.printStackTrace();
                    return null;
                }
            default:
                return null;
        }
        return null;
    }

    private Integer getIntCellValue(Cell cell) {
        if (cell == null) {
            return null;
        }

        switch (cell.getCellType()) {
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return Integer.parseInt(new SimpleDateFormat("yyyyMMdd").format(cell.getDateCellValue()));
                } else {
                    return (int) cell.getNumericCellValue();
                }
            case STRING:
                try {
                    return Integer.parseInt(cell.getStringCellValue());
                } catch (NumberFormatException e) {
                    e.printStackTrace();
                    return null;
                }
            default:
                return null;
        }
    }
    private Boolean getBooleanCellValue(Cell cell) {
        if (cell == null) {
            return null;
        }

        switch (cell.getCellType()) {
            case BOOLEAN:
                return cell.getBooleanCellValue();
            case NUMERIC:
                // Handle numeric values - if it is 0, return false, otherwise return true
                return cell.getNumericCellValue() != 0;
            case STRING:
                // Handle string values - convert to boolean based on string value
                String stringValue = cell.getStringCellValue().trim();
                if (stringValue.equalsIgnoreCase("TRUE")) {
                    return true;
                } else if (stringValue.equalsIgnoreCase("FALSE")) {
                    return false;
                } else {
                    return null; // Returns null if the string value does not match
                }
            default:
                return null; // Returns the default value if the data type is not supported
        }
    }

    private LocalDateTime getLocalDateTimeCellValue(Cell cell) {
        if (cell == null) {
            return null;
        }

        switch (cell.getCellType()) {
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    // Convert from numeric value to LocalDateTime
                    return cell.getDateCellValue().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
                }
                break;
            case STRING:
                try {
                    // Try converting string value to LocalDateTime
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                    return LocalDateTime.parse(cell.getStringCellValue(), formatter);
                } catch (DateTimeParseException e) {
                    e.printStackTrace();
                    return null;
                }
            default:
                return null;
        }
        return null;
    }
    private LocalDateTime getLocalDateTimeCellValue2(Cell cell) {
        if (cell == null) {
            return null;
        }

        switch (cell.getCellType()) {
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    // For numeric dates, convert immediately to LocalDateTime
                    return cell.getLocalDateTimeCellValue();
                }
                break;
            case STRING:
                try {
                    // For strings, use DateTimeFormatter to convert to LocalDateTime
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                    return LocalDate.parse(cell.getStringCellValue(), formatter).atStartOfDay();
                } catch (DateTimeParseException e) {
                    e.printStackTrace();
                    return null;
                }
            default:
                return null;
        }
        return null;
    }

    private LocalDate getLocalDateCellValue(Cell cell) {
        if (cell == null) {
            return null;
        }

        switch (cell.getCellType()) {
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    // Convert from numeric value to LocalDate
                    return cell.getDateCellValue().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                }
                break;
            case STRING:
                try {
                    // Try converting string value to LocalDate
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                    return LocalDate.parse(cell.getStringCellValue(), formatter);
                } catch (DateTimeParseException e) {
                    e.printStackTrace();
                    return null;
                }
            default:
                return null;
        }
        return null;
    }
    private Double getDoubleCellValue(Cell cell) {
        if (cell == null) {
            return null;
        }

        switch (cell.getCellType()) {
            case NUMERIC:
                return cell.getNumericCellValue();
            case STRING:
                try {
                    return Double.parseDouble(cell.getStringCellValue());
                } catch (NumberFormatException e) {
                    e.printStackTrace();
                    return null;
                }
            default:
                return null;
        }
    }








}
