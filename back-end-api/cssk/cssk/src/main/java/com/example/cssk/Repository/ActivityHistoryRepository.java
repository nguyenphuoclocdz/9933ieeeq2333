package com.example.cssk.Repository;


import com.example.cssk.Models.ActivityHistory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ActivityHistoryRepository extends MongoRepository<ActivityHistory, Long> {
    ActivityHistory findTopByOrderByActivityIdDesc();
    ActivityHistory findByActivityId(long activityId);
    List<ActivityHistory> findAllByElderlyId(long ElderlyId);
    List<ActivityHistory> findTop10ByOrderByActivityIdDesc();
    List<ActivityHistory> findAllByTimeContaining(LocalDateTime date);
    List<ActivityHistory> findAllByTimeEquals(LocalDateTime date);

}
