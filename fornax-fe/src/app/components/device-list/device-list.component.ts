import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Device, DeviceStatus } from '../../model/device.model';

import { PRIME_NG_MODULES } from '../../primeng.config';;

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [
    CommonModule,
    ...PRIME_NG_MODULES
  ],
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceListComponent {
  @Input() devices: Device[] = [];
  @Output() deleteRequest = new EventEmitter<number>();

  onDelete(id: number): void {
    this.deleteRequest.emit(id);
  }

  getStatusSeverity(status: DeviceStatus): string {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'error': return 'danger';
      default: return 'info';
    }
  }
}