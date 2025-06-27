import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRIME_NG_MODULES } from '../../primeng.config';

@Component({
  selector: 'app-status-chart',
  standalone: true,
  imports: [
    CommonModule,
    ...PRIME_NG_MODULES 
  ],
  templateUrl: './status-chart.component.html',
  styleUrls: ['./status-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusChartComponent {
  @Input() chartData: any;
  @Input() chartOptions: any = { responsive: true, maintainAspectRatio: false };
}