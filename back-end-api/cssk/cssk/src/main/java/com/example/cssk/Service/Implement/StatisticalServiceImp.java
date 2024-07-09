package com.example.cssk.Service.Implement;


import com.example.cssk.Models.Payment;
import com.example.cssk.Repository.ElderlyRepository;
import com.example.cssk.Repository.PaymentRepository;
import com.example.cssk.Repository.RoomRepository;
import com.example.cssk.Service.IService.StatisticalService;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StatisticalServiceImp implements StatisticalService {

    @Autowired
    private final ElderlyRepository elderlyRepository;
    @Autowired
    private final PaymentRepository paymentRepository;
    @Autowired
    private final RoomRepository roomRepository;

    @Override
    public JSONObject getStatistical(){
        JSONObject response = new JSONObject();
        LocalDate currentDate = LocalDate.now();
        YearMonth currentYearMonth = YearMonth.from(currentDate);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
        response.put("status", "success");
        response.put("totalElderly", elderlyRepository.findByStatus(1).size());
        response.put("totalRoom", roomRepository.findAll().size());
        List<Payment> payments = paymentRepository.findAll();

        Map<String, Long> revenueByMonth = payments.stream()
                .collect(Collectors.groupingBy(payment -> {
                    LocalDate createdAt = payment.getCreated_at().toLocalDate();
                    return YearMonth.from(createdAt).format(DateTimeFormatter.ofPattern("yyyy-MM"));
                }, Collectors.summingLong(Payment::getMoney)));

        JSONObject revenueJSON = new JSONObject(revenueByMonth);
        response.put("revenue", revenueJSON);
        String currentMonthKey = currentYearMonth.format(formatter);
        Long revenueThisMonth = revenueByMonth.getOrDefault(currentMonthKey, 0L); // Get revenue for the current month or default to 0
        response.put("revenue_thisMonth", revenueThisMonth);
        response.put("newElderly_thisMonth", countElderliesCreatedThisMonth());
        long totalRevenue = revenueByMonth.values().stream().mapToLong(Long::longValue).sum();
        double increasePercentage = Math.round(((double) (totalRevenue - revenueThisMonth) / totalRevenue * 100) * 100.0) / 100.0;
        response.put("increase_revenue", increasePercentage);
        return response;
    }

    @Override
    public long countElderliesCreatedThisMonth() {
        // Get the current month and year
        YearMonth currentYearMonth = YearMonth.now();

        // Construct the start and end dates of the current month
        LocalDate startDate = currentYearMonth.atDay(1);
        LocalDate endDate = currentYearMonth.atEndOfMonth();

        // Count the number of elderly created in this month
        return elderlyRepository.findElderliesCreatedBetweenWithStatus(startDate, endDate).size();
    }
    @Override
    public JSONObject getSuccessResponse(String message, Object data) {
        return getResponse("success", message, data);
    }

    @Override
    public JSONObject getErrorResponse(String message) {
        return getResponse("error", message, null);
    }

    @Override
    public JSONObject getResponse(String status, String message, Object data) {
        JSONObject response = new JSONObject();
        response.put("status", status);
        response.put("message", message);
        response.put("data", data);
        return response;
    }
}
