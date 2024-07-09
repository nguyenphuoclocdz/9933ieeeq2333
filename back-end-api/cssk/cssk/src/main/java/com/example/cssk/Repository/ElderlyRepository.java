package com.example.cssk.Repository;

import com.example.cssk.Models.Elderly;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ElderlyRepository extends MongoRepository<Elderly, Long> {
    Elderly findTopByOrderByElderlyIdDesc();
    Elderly findByElderlyId(Long elderlyId);
    Elderly deleteElderlyByElderlyId(Long elderlyId);
    List<Elderly> findElderlyByUserId(Long userId);
    List<Elderly> findByStatus(int i);
    @Query(value = "{ 'timestamp_payment' : { $lt: ?0 }, 'status' : ?1 }")
    List<Elderly> findByTimestampPaymentBeforeAndStatus(long timestamp, int status);
    @Query("{ 'created_at' : { $gte: ?0, $lte: ?1 }, 'status' : 1 }")
    List<Elderly> findElderliesCreatedBetweenWithStatus(LocalDate startDate, LocalDate endDate);
}
