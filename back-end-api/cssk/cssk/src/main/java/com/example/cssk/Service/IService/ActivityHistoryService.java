package com.example.cssk.Service.IService;

import com.example.cssk.Models.ActivityHistory;
import org.json.JSONObject;

import java.time.LocalDateTime;
import java.util.List;

public interface ActivityHistoryService {
    String createActivity(String jsonString);
    long findMaxActivityId();
    String findAllActivity();
    String showTop10Activity();
    String findActivityId(Long id);
    String updateActivityById(Long activityId, String jsonString);
    String deleteActivity(Long activityId);

    String findByDate(String jsonString);

    List<ActivityHistory> findActivityHistoryByDateTime(LocalDateTime dateTime, Long elderlyId);
    JSONObject findByElderlyIdNotReturnErrorEmpty(Long id);
}
