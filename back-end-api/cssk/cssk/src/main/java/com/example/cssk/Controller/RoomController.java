package com.example.cssk.Controller;
import com.example.cssk.Service.IService.RoomService;
import com.example.cssk.Service.Implement.RoomServiceImp;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/room")
@CrossOrigin(origins = "http://localhost:3001/")
public class RoomController {

    private final RoomService RoomService;


    public RoomController(RoomServiceImp roomServiceImp) {
        this.RoomService = roomServiceImp;
    }

    @GetMapping()
    public String getAll(){
        return String.valueOf(RoomService.getAllUser());
    }

    @GetMapping("/info")
    public String getInfo(){
        return String.valueOf(RoomService.getInfoAllRoom());
    }

    @GetMapping("/{room}")
    public String getRooms(@PathVariable String room){
        return String.valueOf(RoomService.getRoom(room));
    }

    @PostMapping()
    public String createRoom(@RequestBody String jsonString){
        return String.valueOf(RoomService.createRoom(jsonString));
    }

    @PutMapping()
    public String updateRoom(@RequestBody String jsonString){
        return String.valueOf(RoomService.updateRoom(jsonString));
    }

    @DeleteMapping()
    public String deleteRoom(@RequestBody String jsonString){
        return String.valueOf(RoomService.deleteRoom(jsonString));
    }

    @GetMapping("/service/{serviceId}")
    public String findRoomService(@PathVariable Long serviceId){
        return String.valueOf(RoomService.chooseService(serviceId));
    }

    @GetMapping("/getAllRoomElderly")
    public String getInfoLocation(){
        return String.valueOf(RoomService.getAllRoomElderly());
    }

}

