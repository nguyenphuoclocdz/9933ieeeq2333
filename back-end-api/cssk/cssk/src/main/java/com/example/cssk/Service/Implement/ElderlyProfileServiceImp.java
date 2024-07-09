package com.example.cssk.Service.Implement;

import com.example.cssk.Models.ElderlyProfile;
import com.example.cssk.Models.User;
import com.example.cssk.Repository.AdministrativePaperworkRepository;
import com.example.cssk.Repository.ElderlyProfileRepository;
import com.example.cssk.Repository.MedicalHistoryRepository;
import com.example.cssk.Repository.UserRepository;
import com.example.cssk.Service.IService.ElderlyProfileService;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ElderlyProfileServiceImp implements ElderlyProfileService {
    @Autowired
    private final ElderlyProfileRepository elderlyProfileRepository;
    @Autowired
    private final JwtTokenProviderServiceImp jwtTokenProviderServiceImp;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final AdministrativePaperworkRepository administrativePaperworkRepository;
    @Autowired
    private final MedicalHistoryRepository medicalHistoryRepository;
    @Override
    public long findMaxId() {
        ElderlyProfile elderlyProfile = elderlyProfileRepository.findTopByOrderByIdDesc();
        if (elderlyProfile != null) {
            return elderlyProfile.getId() + 1;
        } else {
            return 1;
        }
    }

    @Override
    public JSONObject getFormOfElderly(Long elderlyId) {


        String username = jwtTokenProviderServiceImp.GetUserName();
        User checkUser = userRepository.findByUsername(username);
        if (checkUser != null) {
            ElderlyProfile elderlyProfile = new ElderlyProfile();
            elderlyProfile.setAdministrativePaperwork(administrativePaperworkRepository.findByElderlyId(elderlyId));
            elderlyProfile.setMedicalHistory(medicalHistoryRepository.findByElderlyId(elderlyId));
            elderlyProfile.setId(findMaxId());
            elderlyProfile.setStatus(true);
            elderlyProfileRepository.save(elderlyProfile);
            JSONObject response = new JSONObject();
            response.put("status", "Success");
            response.put("data", new JSONObject(elderlyProfile));
            return response;
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("massage", "Get Information Fail");
            return response;
        }
    }

}
