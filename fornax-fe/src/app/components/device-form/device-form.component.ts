import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateDeviceDto } from '../../model/device.model';
import { PRIME_NG_MODULES } from '../../primeng.config';

@Component({
  selector: 'app-device-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...PRIME_NG_MODULES
  ],
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss']
})
export class DeviceFormComponent {
  @Output() addDevice = new EventEmitter<CreateDeviceDto>();
  deviceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.deviceForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      ip: ['', [Validators.required, Validators.pattern(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)]],
      location: ['', Validators.required],
    });
  }

  submitForm(): void {
    if (this.deviceForm.invalid) {
      return;
    }
    this.addDevice.emit(this.deviceForm.value);
    this.deviceForm.reset();
  }
}
