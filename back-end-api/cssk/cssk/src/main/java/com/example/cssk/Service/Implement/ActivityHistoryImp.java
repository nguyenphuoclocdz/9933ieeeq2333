package com.example.cssk.Service.Implement;

import com.example.cssk.Models.ActivityHistory;
import com.example.cssk.Models.Elderly;
import com.example.cssk.Repository.ActivityHistoryRepository;
import com.example.cssk.Repository.ElderlyRepository;
import com.example.cssk.Repository.RoomRepository;
import com.example.cssk.Service.IService.ActivityHistoryService;
import lombok.AllArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ActivityHistoryImp implements ActivityHistoryService {
    private final MongoTemplate mongoTemplate;
    @Autowired
    private final ActivityHistoryRepository activityHistoryRepository;
    @Autowired
    private final JwtTokenProviderServiceImp jwtTokenProviderServiceImp;
    @Autowired
    private final ElderlyRepository elderlyRepository;
    @Autowired
    private final RoomRepository roomRepository;

    @Override
    public String createActivity(String jsonString) {
        try {
            JSONObject requestData = new JSONObject(jsonString);
            ActivityHistory activityHistory = new ActivityHistory();
            activityHistory.setActivityId(findMaxActivityId());
            activityHistory.setTitle(requestData.getString("title"));
            activityHistory.setElderlyId(requestData.getLong("elderlyId"));
            if ((jwtTokenProviderServiceImp.GetRole()).equals("4")) {
                activityHistory.setRole("Nurse");
            } else if ((jwtTokenProviderServiceImp.GetRole()).equals("3")) {
                activityHistory.setRole("Doctor");
            }
            activityHistory.setHistory(requestData.getString("history"));
            activityHistory.setTime(LocalDateTime.now());
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("message", "Activity created successfully");
            response.put("data", new JSONObject(activityHistoryRepository.save(activityHistory)));
            return response.toString();
        } catch (Exception e) {
            e.printStackTrace();
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "Failed to create activity");
            return response.toString();
        }
    }

    public String getbyId(long activityId) {
        ActivityHistory activityHistory = activityHistoryRepository.findByActivityId(activityId);
        if (activityHistory == null) {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "This activity with ID: " + activityId + " not found!");
            return response.toString();
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("data", new JSONObject(activityHistory));
            return response.toString();
        }
    }

    @Override
    public long findMaxActivityId() {
        ActivityHistory latestActivity = activityHistoryRepository.findTopByOrderByActivityIdDesc();
        if (latestActivity != null) {
            return latestActivity.getActivityId() + 1;
        } else {
            return 1;
        }
    }

    @Override
    public String findAllActivity() {
        JSONObject response = new JSONObject();
        List<ActivityHistory> activityHistories = activityHistoryRepository.findAll();
        if (activityHistories.isEmpty()) {
            response.put("status", "error");
            response.put("message", "Do have any information");
        } else {
            JSONArray data = new JSONArray();
            for (ActivityHistory activity : activityHistories) {
                JSONObject activityJSON = new JSONObject();
                Elderly elderly = elderlyRepository.findByElderlyId(activity.getElderlyId());
                if (elderly != null) {
                    JSONObject elderlyInfo = new JSONObject();
                    elderlyInfo.put("elderlyId", elderly.getElderlyId());
                    elderlyInfo.put("fullNameElderly", elderly.getFullNameElderly());
                    String roomName = elderly.getRoomName();
                    if (roomName != null && roomName.contains("-")) {
                        String[] parts = roomName.split("-");
                        roomName = "Room " + parts[0].trim() + " - Beds " + parts[1].trim();
                    }
                    elderlyInfo.put("roomName", roomName);
                    activityJSON.put("activityId", activity.getActivityId());
                    activityJSON.put("history", activity.getHistory());
                    activityJSON.put("title", activity.getTitle());
                    activityJSON.put("updated_at", activity.getUpdated_at());
                    activityJSON.put("date_create", activity.getTime());
                    activityJSON.put("elderlyInfo", elderlyInfo);
                    data.put(activityJSON);
                }
            }
            response.put("status", "success");
            response.put("data", data);
        }
        return response.toString();
    }


    @Override
    public String findActivityId(Long id) {
        JSONObject response = new JSONObject();
        List<ActivityHistory> activityHistories = activityHistoryRepository.findAllByElderlyId(id);
        if (activityHistories.isEmpty()) {
            response.put("status", "error");
            response.put("message", "Do have any information");
        } else {
            JSONArray data = new JSONArray();
            for (ActivityHistory activity : activityHistories) {
                JSONObject activityJSON = new JSONObject();
                Elderly elderly = elderlyRepository.findByElderlyId(activity.getElderlyId());
                if (elderly != null) {
                    JSONObject elderlyInfo = new JSONObject();
                    elderlyInfo.put("elderlyId", elderly.getElderlyId());
                    elderlyInfo.put("fullNameElderly", elderly.getFullNameElderly());
                    String roomName = elderly.getRoomName();
                    if (roomName != null && roomName.contains("-")) {
                        String[] parts = roomName.split("-");
                        roomName = "Room " + parts[0].trim() + " - Beds " + parts[1].trim();
                    }
                    elderlyInfo.put("roomName", roomName);
                    activityJSON.put("activityId", activity.getActivityId());
                    activityJSON.put("history", activity.getHistory());
                    activityJSON.put("title", activity.getTitle());
                    activityJSON.put("updated_at", activity.getUpdated_at());
                    activityJSON.put("date_create", activity.getTime());
                    activityJSON.put("elderlyInfo", elderlyInfo);
                    data.put(activityJSON);
                }
            }
            response.put("status", "success");
            response.put("data", data);
        }
        return response.toString();
    }

    @Override
    public String updateActivityById(Long activityId, String jsonString) {
        ActivityHistory activityHistory = activityHistoryRepository.findByActivityId(activityId);
        if (activityHistory == null) {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "This activity with ID: " + activityId + " not found!");
            return response.toString();
        } else {
            try {
                JSONObject requestData = new JSONObject(jsonString);
                activityHistory.setTitle(requestData.getString("title"));
                activityHistory.setHistory(requestData.getString("history"));
                activityHistory.setUpdatedAt(LocalDateTime.now());
                ActivityHistory activityHistory1 = activityHistoryRepository.save(activityHistory);
                JSONObject response = new JSONObject();
                response.put("status", "success");
                response.put("message", "Updated activity successfully");
                response.put("data", new JSONObject(activityHistory1));
                return response.toString();
            } catch (Exception e) {
                e.printStackTrace();
                JSONObject response = new JSONObject();
                response.put("status", "error");
                response.put("message", "Updated activity fail");
                return response.toString();
            }
        }
    }

    @Override
    public String deleteActivity(Long activityId) {
        ActivityHistory activityHistory = activityHistoryRepository.findByActivityId(activityId);
        if (activityHistory != null) {
            activityHistoryRepository.deleteById(activityId);
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("massage", "Delete Successfully!");
            return response.toString();
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("massage", "Delete Fail! The id does not exist");
            return response.toString();
        }
    }

    @Override
    public String showTop10Activity() {
        JSONObject response = new JSONObject();
        List<ActivityHistory> activityHistories = activityHistoryRepository.findTop10ByOrderByActivityIdDesc();
        if (activityHistories.isEmpty()) {
            response.put("status", "error");
            response.put("message", "Information is empty!");
        } else {
            JSONArray data = new JSONArray();
            for (ActivityHistory activity : activityHistories) {
                JSONObject activityJSON = new JSONObject();
                Elderly elderly = elderlyRepository.findByElderlyId(activity.getElderlyId());
                if (elderly != null) {
                    JSONObject elderlyInfo = new JSONObject();
                    elderlyInfo.put("elderlyId", elderly.getElderlyId());
                    elderlyInfo.put("fullNameElderly", elderly.getFullNameElderly());
                    String roomName = elderly.getRoomName();
                    if (roomName != null && roomName.contains("-")) {
                        String[] parts = roomName.split("-");
                        roomName = "Room " + parts[0].trim() + " - Beds " + parts[1].trim();
                    }
                    elderlyInfo.put("roomName", roomName);
                    activityJSON.put("activityId", activity.getActivityId());
                    activityJSON.put("history", activity.getHistory());
                    activityJSON.put("title", activity.getTitle());
                    activityJSON.put("updated_at", activity.getUpdated_at());
                    activityJSON.put("date_create", activity.getTime());
                    activityJSON.put("elderlyInfo", elderlyInfo);
                    data.put(activityJSON);
                }
            }
            response.put("status", "success");
            response.put("data", data);
        }
        return response.toString();
    }

    @Override
    public String findByDate(String jsonString) {
        JSONObject response = new JSONObject();
        try {
            JSONObject requestData = new JSONObject(jsonString);
            LocalDateTime dateTime = LocalDateTime.parse(requestData.getString("date")+"T00:00:00");
            List<ActivityHistory> activityHistories = findActivityHistoryByDateTime(dateTime, requestData.getLong("elderlyId"));
            if (activityHistories.isEmpty()) {
                response.put("status", "error");
                response.put("message", "Information is empty!");
            } else {
                JSONArray data = new JSONArray();
                for (ActivityHistory activity : activityHistories) {
                    JSONObject activityJSON = new JSONObject();
                    Elderly elderly = elderlyRepository.findByElderlyId(activity.getElderlyId());
                    if (elderly != null) {
                        JSONObject elderlyInfo = new JSONObject();
                        elderlyInfo.put("elderlyId", elderly.getElderlyId());
                        elderlyInfo.put("fullNameElderly", elderly.getFullNameElderly());
                        String roomName = elderly.getRoomName();
                        if (roomName != null && roomName.contains("-")) {
                            String[] parts = roomName.split("-");
                            roomName = "Room " + parts[0].trim() + " - Beds " + parts[1].trim();
                        }
                        elderlyInfo.put("roomName", roomName);
                        activityJSON.put("activityId", activity.getActivityId());
                        activityJSON.put("history", activity.getHistory());
                        activityJSON.put("title", activity.getTitle());
                        activityJSON.put("updated_at", activity.getUpdated_at());
                        activityJSON.put("date_create", activity.getTime());
                        activityJSON.put("elderlyInfo", elderlyInfo);
                        data.put(activityJSON);
                    }
                }
                response.put("status", "success");
                response.put("data", data);
            }

        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error " + e.getMessage());
        }
        return response.toString();
    }
    @Override
    public List<ActivityHistory> findActivityHistoryByDateTime(LocalDateTime dateTime, Long elderlyId) {
        LocalDateTime startOfDay = dateTime.with(LocalTime.MIN);
        LocalDateTime endOfDay = dateTime.with(LocalTime.MAX);
        Query query = new Query();
        Criteria criteria = Criteria.where("date_create").gte(startOfDay).lt(endOfDay);

        if (elderlyId != 0) {
            criteria = criteria.and("elderlyId").is(elderlyId);
        }

        query.addCriteria(criteria);
        return mongoTemplate.find(query, ActivityHistory.class);
    }

    @Override
    public JSONObject findByElderlyIdNotReturnErrorEmpty(Long id) {
        List<ActivityHistory> list = activityHistoryRepository.findAllByElderlyId(id);
        JSONObject response = new JSONObject();
        response.put("status", "success");
        response.put("data", list);
        return response;
    }


}
