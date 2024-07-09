package com.example.cssk.Service.IService;

import com.example.cssk.Models.Menu;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface MenuService {
    String findAllMenu();

    long findMaxMenuId();

    String createMenu(String jsonString) throws JsonProcessingException;
    Menu createMenuFromJson(String String) throws JsonProcessingException;
    String getMenuByMenuId(Long MenuId);
    String updateMenu(Long MenuId, String jsonString) throws JsonProcessingException;
    String deleteMenu(Long MenuId);
    String ToggleDisable(Long menuId);
}
