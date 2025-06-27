package com.fornax_be.fornax_be.controller;


import com.fornax_be.fornax_be.dto.CreateDeviceRequest;
import com.fornax_be.fornax_be.model.Device;
import com.fornax_be.fornax_be.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/devices")
public class DeviceController {

    private final DeviceService deviceService;

    @Autowired
    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping
    public ResponseEntity<List<Device>> listDevices() {

        List<Device> devices = deviceService.getAllDevicesAndUpdateStatuses();
        return ResponseEntity.ok(devices);
    }

    @PostMapping
    public ResponseEntity<Device> addDevice(@RequestBody CreateDeviceRequest createDeviceRequest) {
        Device createdDevice = deviceService.createDevice(createDeviceRequest);
        return new ResponseEntity<>(createdDevice, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id) {
        deviceService.deleteDevice(id);
        return ResponseEntity.noContent().build();
    }
}