package com.example.cssk.Service.Implement;

import com.example.cssk.Models.*;
import com.example.cssk.Repository.*;
import com.example.cssk.Service.IService.ElderlyService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.sql.Timestamp;
import java.util.Date;

@Service
@AllArgsConstructor
public class ElderlyServiceImp implements ElderlyService {
    @Autowired
    private final ElderlyRepository elderlyRepository;
    @Autowired
    private final JwtTokenProviderServiceImp jwtTokenProviderServiceImp;
    @Autowired
    private final ObjectMapper objectMapper;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final AdministrativePaperworkRepository administrativePaperworkRepository;
    @Autowired
    private final AdministrativePaperworkImp administrativePaperworkImp;
    @Autowired
    private final MedicalHistoryRepository medicalHistoryRepository;
    @Autowired
    private final MedicalHistoryServiceImp medicalHistoryServiceImp;
    @Autowired
    private ServicePackRepository servicePackRepository;
    @Autowired
    private RoomRepository roomRepository;

    @Override
    public JSONObject findAllElderly() {
        List<Elderly> elderlyList;
        if (jwtTokenProviderServiceImp.GetRole() == 1 || jwtTokenProviderServiceImp.GetRole() == 3 || jwtTokenProviderServiceImp.GetRole() == 5 || jwtTokenProviderServiceImp.GetRole() == 4) {
            elderlyList = elderlyRepository.findAll();
        } else {
            elderlyList = elderlyRepository.findElderlyByUserId(jwtTokenProviderServiceImp.GetUserId());
        }
        for (Elderly elderly : elderlyList) {
            String roomName = elderly.getRoomName();
            if (roomName != null && roomName.contains("-")) {
                String[] parts = roomName.split("-");
                roomName = "Room " + parts[0].trim() + " - Beds " + parts[1].trim();
                elderly.setRoomName(roomName);
            }
            Long serviceId = elderly.getServiceId();
            if (serviceId != null) {
                ServicePack servicePack = servicePackRepository.findServicePackByPackId(serviceId);
                if (servicePack != null) {
                    elderly.setNamePack(servicePack.getNamePack());
                }
            }
        }
        return getSuccessResponse("Users retrieved successfully", elderlyList);
    }

    @Override
    public JSONObject getResponse(String status, String message, Object data) {
        JSONObject response = new JSONObject();
        response.put("status", status);
        response.put("message", message);
        response.put("data", data);
        return response;
    }

    @Override
    public JSONObject getSuccessResponse(String message, Object data) {
        return getResponse("success", message, data);
    }

    @Override
    public String createElderly(String jsonString) throws JsonProcessingException {
        JSONObject requestData = new JSONObject(jsonString);
        Elderly elderly = createElderlyFromJson(jsonString);
        elderly.setFullNameElderly(requestData.getString("fullname"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate birthday = LocalDate.parse(requestData.getString("birthday"), formatter);
        LocalDateTime birthday1 = birthday.atStartOfDay().plusHours(24);
        elderly.setBirthdayElderly(birthday1);
        elderly.setGenderElderly(requestData.getString("gender"));
        elderly.setDomicile(requestData.getString("domicile"));
        elderly.setResident(requestData.getString("resident"));
        elderly.setStatus(0);
        elderly.setRemove(false);
        elderly.setUserId(jwtTokenProviderServiceImp.GetUserId());
        elderly.setRelative(jwtTokenProviderServiceImp.GetUserName());
        elderly.setElderlyId(findMaxElderlyId());
        elderly.setCreatedAt(LocalDateTime.now());
        elderly.setUpdatedAt(LocalDateTime.now());
        AdministrativePaperwork administrativePaperwork = new AdministrativePaperwork();
        MedicalHistory medicalHistory = new MedicalHistory();
        Elderly createdElderly = elderlyRepository.save(elderly);

        administrativePaperwork.setElderlyId(elderly.getElderlyId());
        administrativePaperwork.setCreated_at(LocalDateTime.now());
        administrativePaperwork.setPaperworkId(administrativePaperworkImp.findMaxPaperworkId());
        administrativePaperworkRepository.save(administrativePaperwork);

        medicalHistory.setElderlyId(elderly.getElderlyId());
        medicalHistory.setCreatedAt(LocalDateTime.now());
        medicalHistory.setId(medicalHistoryServiceImp.findMaxId());
        medicalHistoryRepository.save(medicalHistory);

        JSONObject response = new JSONObject();
        response.put("status", "success");
        response.put("massage", "create successfully");
        response.put("data", new JSONObject(createdElderly));
        return response.toString();
    }

    @Override
    public Elderly createElderlyFromJson(String jsonString) throws JsonProcessingException {
        return objectMapper.readValue(jsonString, Elderly.class);
    }

    @Override
    public JSONObject getErrorResponse(String message) {
        return getResponse("error", message, null);
    }

    @Override
    public long findMaxElderlyId() {
        Elderly latestElderly = elderlyRepository.findTopByOrderByElderlyIdDesc();
        if (latestElderly != null) {
            return latestElderly.getElderlyId() + 1;
        } else {
            return 1;
        }
    }

    @Override
    public String getElderlyByElderlyId(Long elderlyId) {
        JSONObject response = new JSONObject();
        Elderly elderly = elderlyRepository.findByElderlyId(elderlyId);
        if (elderly != null) {
            response.put("status", "success");
            response.put("data", new JSONObject(elderly));
            return response.toString();
        } else {
            response.put("status", "error");
            response.put("data", "The id does not exist");
            return response.toString();
        }
    }

    @Override
    public JSONObject updateElderly(Long elderlyId, String jsonString) {
        JSONObject requestData = new JSONObject(jsonString);
        Elderly savedElderly = elderlyRepository.findByElderlyId(elderlyId);
        if (savedElderly != null) {
            savedElderly.setUpdatedAt(LocalDateTime.now());
            savedElderly.setFullNameElderly(requestData.getString("fullNameElderly"));
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX");
            LocalDate birthday = LocalDate.parse(requestData.getString("birthday"), formatter);
            LocalDateTime birthday1 = birthday.atStartOfDay().plusHours(24);
            savedElderly.setBirthdayElderly(birthday1);
            savedElderly.setGenderElderly(requestData.getString("gender"));
            elderlyRepository.save(savedElderly);
            return getSuccessResponse("Elderly updated successfully", new JSONObject(savedElderly));
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("massage", "Update fail! The id does not exist");
            return response;
        }
    }

    @Override
    public JSONObject updateStatus(Long elderlyId, String jsonString) {
        JSONObject requestData = new JSONObject(jsonString);
        Elderly savedElderly = elderlyRepository.findByElderlyId(elderlyId);
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (savedElderly != null) {
            savedElderly.setUpdatedAt(LocalDateTime.now());
            savedElderly.setTimestamp_payment(timestamp.getTime());
            savedElderly.setStatus(requestData.getInt("status"));
            elderlyRepository.save(savedElderly);
            Room room = roomRepository.findByNameRoom(savedElderly.getRoomName());
            room.setElderlyId(elderlyId);
            room.setStatus(1);
            roomRepository.save(room);
            return getSuccessResponse("Elderly updated successfully", new JSONObject(savedElderly));
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("massage", "Update fail! The id does not exist");
            return response;
        }
    }

    @Override
    public JSONObject updateSR(Long elderlyId, String jsonString) {
        JSONObject requestData = new JSONObject(jsonString);
        Elderly savedElderly = elderlyRepository.findByElderlyId(elderlyId);
        if (savedElderly != null) {
            savedElderly.setUpdatedAt(LocalDateTime.now());
            savedElderly.setServiceId(requestData.getLong("serviceId"));
            savedElderly.setRoomName(requestData.getString("roomName"));
            elderlyRepository.save(savedElderly);
            return getSuccessResponse("Elderly updated successfully", new JSONObject(savedElderly));
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("massage", "Update fail! The id does not exist");
            return response;
        }
    }


    @Override
    public JSONObject deleteElderly(Long elderlyId) {
        Elderly elderly = elderlyRepository.findByElderlyId(elderlyId);
        Room room = roomRepository.findByElderlyId(elderlyId);
        if (elderly != null) {
            elderly.setRemove(true);
            elderlyRepository.save(elderly);
            room.setStatus(0);
            room.setElderlyId(0L);
            room.setUser(0);
            roomRepository.save(room);
            return getSuccessResponse("Elderly deleted successfully", null);
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("massage", "Delete Fail! The id does not exist");
            return response;
        }
    }

    @Override
    public JSONObject getElderlyByToken() {
        JSONObject response = new JSONObject();
        String username = jwtTokenProviderServiceImp.GetUserName();
        User user = userRepository.findByUsername(username);
        List<Elderly> elderly = elderlyRepository.findElderlyByUserId(user.getUserId());
        if (!elderly.isEmpty()) {
            response.put("status", "Success");
            response.put("data", new JSONObject(elderly));
            return response;
        } else {
            response.put("status", "error");
            response.put("massage", "The user does not have any elderly!");
            return response;
        }
    }
}
