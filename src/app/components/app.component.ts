import { Component } from '@angular/core';
import { SeriesOption } from 'echarts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public data: Map<string, SeriesOption> = new Map([
    ['Series A', { data: [10, 20, 30] }],
    ['Series B', { data: [40, 50, 60] }],
  ]);
}
