import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { Device, CreateDeviceDto } from '../model/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.apiUrl);
  }

  addDevice(device: CreateDeviceDto): Observable<Device> {
    return this.http.post<Device>(this.apiUrl, device);
  }

  deleteDevice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}