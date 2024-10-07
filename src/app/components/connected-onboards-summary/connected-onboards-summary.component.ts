import { Component } from '@angular/core';
import { SeriesOption } from 'echarts';
import { CONNECTED_ONBOARDS_LITERAL, DEFAULT_THEME } from 'src/app/core';

@Component({
  selector: 'connected-onboards-summary',
  templateUrl: './connected-onboards-summary.component.html',
  styleUrls: ['./connected-onboards-summary.component.scss'],
})
export class ConnectedOnboardsSummaryComponent {
  public onboardsLineChartDataMap: Map<string, SeriesOption> = new Map([
    ['Series A', { data: [10, 20, 30] }],
    ['Series B', { data: [40, 50, 60] }],
  ]);
  public connectedOnboardsTitleText = CONNECTED_ONBOARDS_LITERAL;
  public selectedTheme = DEFAULT_THEME;

  constructor() {}
}
