import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Subscription, interval } from 'rxjs';
import { Device, CreateDeviceDto } from '../../model/device.model';
import { DeviceService } from '../../service/device.service';
import { MessageService } from 'primeng/api';
import { PRIME_NG_MODULES } from '../../primeng.config';
import { StatusChartComponent } from '../status-chart/status-chart.component';
import { DeviceFormComponent } from '../device-form/device-form.component';
import { DeviceListComponent } from '../device-list/device-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,        
    ...PRIME_NG_MODULES,  

    StatusChartComponent,
    DeviceFormComponent,
    DeviceListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  devices: Device[] = [];
  chartData: any;
  autoRefreshEnabled = true;


  private readonly MAX_CHART_POINTS = 20; 


  private subscriptions = new Subscription();
  private refreshSubscription: Subscription | null = null;

  constructor(
    private deviceService: DeviceService,
    private messageService: MessageService
  ) {}

 
  ngOnInit(): void {
    this.initializeChart();
    this.loadDevices();
    this.startAutoRefresh();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  loadDevices(): void {
    const sub = this.deviceService.getDevices().subscribe({
      next: (data) => {
        this.devices = data;
        this.updateChartData(data);
      },
      error: (err) => {
        this.showToast('error', 'Hiba', 'Az eszközök betöltése sikertelen.');
        console.error('Hiba az eszközök betöltésekor:', err);
      },
    });
    this.subscriptions.add(sub);
  }


  handleAddDevice(deviceDto: CreateDeviceDto): void {
    const sub = this.deviceService.addDevice(deviceDto).subscribe({
      next: () => {
        this.showToast('success', 'Siker', 'Eszköz sikeresen hozzáadva.');
        this.loadDevices(); 
      },
      error: (err) => {
        this.showToast('error', 'Hiba', 'Az eszköz hozzáadása sikertelen.');
        console.error('Hiba az eszköz hozzáadásakor:', err);
      },
    });
    this.subscriptions.add(sub);
  }

  handleDeleteDevice(id: number): void {
    const sub = this.deviceService.deleteDevice(id).subscribe({
      next: () => {
        this.showToast('info', 'Siker', 'Eszköz sikeresen törölve.');
        this.loadDevices(); 
      },
      error: (err) => {
        this.showToast('error', 'Hiba', 'Az eszköz törlése sikertelen.');
        console.error(`Hiba a(z) ${id} ID-jú eszköz törlésekor:`, err);
      },
    });
    this.subscriptions.add(sub);
  }


  toggleAutoRefresh(): void {
    if (this.autoRefreshEnabled) {
      this.startAutoRefresh();
    } else {
      this.stopAutoRefresh();
    }
  }


  private startAutoRefresh(): void {

    if (this.refreshSubscription && !this.refreshSubscription.closed) {
      return;
    }
    this.refreshSubscription = interval(4000).subscribe(() => this.loadDevices());
    this.subscriptions.add(this.refreshSubscription);
  }

  private stopAutoRefresh(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private initializeChart(): void {
    this.chartData = {
      labels: [],
      datasets: [
        { label: 'Aktív', data: [], borderColor: '#42A5F5', tension: .4, fill: false },
        { label: 'Inaktív', data: [], borderColor: '#FFA726', tension: .4, fill: false },
        { label: 'Hiba', data: [], borderColor: '#FF6384', tension: .4, fill: false }
      ]
    };
  }

  private updateChartData(devices: Device[]): void {
    const now = new Date();
    const newLabel = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    const activeCount = devices.filter(d => d.status === 'active').length;
    const inactiveCount = devices.filter(d => d.status === 'inactive').length;
    const errorCount = devices.filter(d => d.status === 'error').length;
    

    this.chartData.labels.push(newLabel);
    this.chartData.datasets[0].data.push(activeCount);
    this.chartData.datasets[1].data.push(inactiveCount);
    this.chartData.datasets[2].data.push(errorCount);
    

    if (this.chartData.labels.length > this.MAX_CHART_POINTS) {
      this.chartData.labels.shift();
      this.chartData.datasets.forEach((dataset:any) => dataset.data.shift());
    }
    
    this.chartData = { ...this.chartData };
  }

  private showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}