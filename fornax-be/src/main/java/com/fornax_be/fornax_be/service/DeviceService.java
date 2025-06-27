package com.fornax_be.fornax_be.service;


import com.fornax_be.fornax_be.dto.CreateDeviceRequest;
import com.fornax_be.fornax_be.model.Device;
import com.fornax_be.fornax_be.model.DeviceStatus;
import com.fornax_be.fornax_be.repository.DeviceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class DeviceService {

    private final DeviceRepository deviceRepository;
    private final Random random = new Random();

    @Autowired
    public DeviceService(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }


    @Transactional
    public List<Device> getAllDevicesAndUpdateStatuses() {
        List<Device> devices = deviceRepository.findAll();
        DeviceStatus[] allStatuses = DeviceStatus.values();

        for (Device device : devices) {
            device.setStatus(allStatuses[random.nextInt(allStatuses.length)]);
        }

        return deviceRepository.saveAll(devices);
    }

    public Device createDevice(CreateDeviceRequest request) {
        Device newDevice = new Device();
        newDevice.setName(request.getName());
        newDevice.setType(request.getType());
        newDevice.setIp(request.getIp());
        newDevice.setLocation(request.getLocation());
        newDevice.setStatus(DeviceStatus.active);

        return deviceRepository.save(newDevice);
    }

    public void deleteDevice(Long id) {
        if (deviceRepository.existsById(id)) {
            deviceRepository.deleteById(id);
        }

    }
}