package com.example.cssk.Controller;

import com.example.cssk.Service.IService.MenuService;
import com.example.cssk.Service.Implement.MenuServiceImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/menu")
public class MenuController {
    @Autowired
    private final MenuService MenuService;

    @GetMapping()
    public String getAll() {
        return MenuService.findAllMenu();
    }

    @PostMapping()
    public String AddMenu(@RequestBody String jsonString) throws JsonProcessingException {
        return MenuService.createMenu(jsonString);
    }

    @PutMapping("/{id}")
    public String Update(@RequestBody String jsonString, @PathVariable Long id) throws JsonProcessingException {
        return MenuService.updateMenu(id, jsonString);
    }

    @GetMapping("/{id}")
    public String InfoMenu(@PathVariable Long id) {
        return MenuService.getMenuByMenuId(id);
    }

    @DeleteMapping("/{id}")
    public String DeleteMenu(@PathVariable Long id) {
        return MenuService.deleteMenu(id);
    }

    @PutMapping("/disable/{id}")
    public String ToggleDisable(@PathVariable Long id){
        return MenuService.ToggleDisable(id);
    }
}
