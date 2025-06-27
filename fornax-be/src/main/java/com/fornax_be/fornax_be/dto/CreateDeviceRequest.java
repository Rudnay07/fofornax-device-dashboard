package com.fornax_be.fornax_be.dto;

import com.fornax_be.fornax_be.model.DeviceStatus;



public class CreateDeviceRequest {
    private String name;
    private String type;
    private String ip;
    private String location;
    private DeviceStatus status;

    public DeviceStatus getStatus() {
        return status;
    }

    public void setStatus(DeviceStatus status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}