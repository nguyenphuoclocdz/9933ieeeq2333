package com.example.cssk.Service.Implement;

import com.example.cssk.Models.Menu;
import com.example.cssk.Service.IService.MenuService;
import com.example.cssk.Repository.MenuRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class MenuServiceImp implements MenuService {
    @Autowired
    private final ObjectMapper objectMapper;
    @Autowired
    private final MenuRepository menuRepository;
    @Autowired
    private final JwtTokenProviderServiceImp jwtTokenProviderServiceImp;

    @Override
    public String findAllMenu() {
        JSONObject response = new JSONObject();
        List<Menu> menu;
        if (jwtTokenProviderServiceImp.GetRole() == 1) {
            menu = menuRepository.findAllByOrderByMenuIdDesc();
        } else {
        menu = menuRepository.findAllByDisableFalse();
            System.out.println(menu);
        }
        response.put("status", "success");
        response.put("data", menu);
        return response.toString();
    }

    @Override
    public long findMaxMenuId() {
        Menu latestMenu = menuRepository.findTopByOrderByMenuIdDesc();
        if (latestMenu != null) {
            return latestMenu.getMenuId() + 1;
        } else {
            return 1;
        }
    }

    @Override
    public String createMenu(String jsonString) throws JsonProcessingException {
        Menu newMenu = createMenuFromJson(jsonString);
        newMenu.setMenuId(findMaxMenuId());
        newMenu.setUpdatedAt(LocalDateTime.now());
        newMenu.setCreatedAt(LocalDateTime.now());
        menuRepository.save(newMenu);
        JSONObject response = new JSONObject();
        response.put("status", "success");
        response.put("massage", "create successfully");
        response.put("data", new JSONObject(newMenu));
        return response.toString();
    }

    @Override
    public Menu createMenuFromJson(String jsonString) throws JsonProcessingException {
        return objectMapper.readValue(jsonString, Menu.class);
    }

    @Override
    public String getMenuByMenuId(Long MenuId) {
        JSONObject response = new JSONObject();
        Menu menu = menuRepository.findByMenuId(MenuId);
        if (menu != null) {
            response.put("status", "success");
            response.put("data", new JSONObject(menu));
            return response.toString();
        } else {
            response.put("status", "error");
            response.put("data", "The Menu that you searched does not exist!");
            return response.toString();
        }
    }

    @Override
    public String updateMenu(Long MenuId, String jsonString) throws JsonProcessingException {

        JSONObject response = new JSONObject();
        Menu savedMenu = menuRepository.findByMenuId(MenuId);
        if (savedMenu != null) {
            Menu updateMenu = createMenuFromJson(jsonString);
            updateMenu.setUpdatedAt(LocalDateTime.now());
            updateMenu.setCreated_at(savedMenu.getCreated_at());
            updateMenu.setMenuId(savedMenu.getMenuId());
            menuRepository.save(updateMenu);
            response.put("status", "success");
            response.put("data", new JSONObject(updateMenu));
            response.put("massage", "The menu has been updated successfully");
            return response.toString();
        } else {
            response.put("status", "error");
            response.put("massage", "The id does not exist!. Get Information Fail");
            return response.toString();
        }
    }


    @Override
    public String deleteMenu(Long MenuId) {
        JSONObject response = new JSONObject();
        if (menuRepository.existsByMenuId(MenuId) && (jwtTokenProviderServiceImp.GetRole() == 1 || jwtTokenProviderServiceImp.GetRole() == 5)) {
            if (jwtTokenProviderServiceImp.GetRole() == 1) {
                menuRepository.deleteById(MenuId);
            } else {
            Menu menu = menuRepository.findByMenuId(MenuId);
            menu.setDisable(true);
            menuRepository.save(menu);
            }
            response.put("status", "success");
            response.put("massage", "The menu has been deleted successfully");
            return response.toString();
        } else {
            response.put("status", "error");
            response.put("massage", "The id does not exist!. Delete Fail");
            return response.toString();
        }
    }

    @Override
    public String ToggleDisable(Long menuId) {
        JSONObject response = new JSONObject();
        Menu menu = menuRepository.findByMenuId(menuId);
        menu.setDisable(!menu.isDisable());
        menuRepository.save(menu);
        response.put("status", "success");
        response.put("data", menu);
        response.put("massage", "The menu has been updated successfully");
        return response.toString();
    }
}

