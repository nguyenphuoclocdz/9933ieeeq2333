package com.example.cssk.Controller;

import com.example.cssk.Service.IService.ActivityHistoryService;
import com.example.cssk.Service.Implement.ActivityHistoryImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/activity")
@AllArgsConstructor
public class ActivityHistoryController {
    @Autowired
    private final ActivityHistoryService ActivityHistoryService;

    @GetMapping()
    public String getAllActivity()  {
        return ActivityHistoryService.findAllActivity();
    }

    @GetMapping("/{activityId}")
    public String getById(@PathVariable long activityId ){
        return String.valueOf(ActivityHistoryService.findActivityId(activityId));
    }
    @PostMapping()
    public String creatActivity(@RequestBody String jsonString) throws JsonProcessingException {
        return ActivityHistoryService.createActivity(jsonString);
    }
    @PutMapping("/{activityId}")
    public String updateActivityById(@PathVariable Long activityId, @RequestBody String jsonString) throws JsonProcessingException {
        return ActivityHistoryService.updateActivityById(activityId, jsonString );
    }
    @DeleteMapping("/{activityId}")
    public String deleteMedicine(@PathVariable Long activityId) throws JsonProcessingException {
        return ActivityHistoryService.deleteActivity(activityId);
    }

    @GetMapping("/top10")
    public String showTop10() throws JsonProcessingException {
        return ActivityHistoryService.showTop10Activity();
    }

    @PostMapping("/inputDate")
    public String findByDate_create(@RequestBody String data) throws JsonProcessingException {
        return ActivityHistoryService.findByDate(data);
    }

    @GetMapping("/elderly/{activityId}")
    public String getByIdNotError (@PathVariable long activityId){
        return String.valueOf(ActivityHistoryService.findByElderlyIdNotReturnErrorEmpty (activityId));
    }


}
