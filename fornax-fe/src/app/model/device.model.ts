export type DeviceStatus = 'active' | 'inactive' | 'error';

export interface Device {
  id: number;
  name: string;
  type: string;
  ip: string;
  status: DeviceStatus;
  location: string;
}

export type CreateDeviceDto = Omit<Device, 'id' | 'status'>;