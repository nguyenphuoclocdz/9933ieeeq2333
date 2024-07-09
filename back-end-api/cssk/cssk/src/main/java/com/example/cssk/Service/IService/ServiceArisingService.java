package com.example.cssk.Service.IService;

public interface ServiceArisingService {
    String createServiceArising(String jsonString);
    long findMaxServiceArisingId();
    String findAllServiceArising();
    String getServiceArisingByServiceArisingId(Long serviceArisingId);
    String updateServiceArisingById(Long serviceArisingId, String jsonString);
    String deleteServiceArising(Long serviceArisingId);

}
