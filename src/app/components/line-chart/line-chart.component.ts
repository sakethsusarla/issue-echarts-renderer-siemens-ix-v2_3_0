import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption, SeriesOption } from 'echarts';
import { Subscription } from 'rxjs';
import { DEFAULT_THEME, calculateLabelRotationAngle, formatToReaderFriendlyDateLabel, formatToReaderFriendlyDateTooltip, isValidString } from 'src/app/core';
import { MessengerService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnDestroy {
  private _selectedThemeSubscription!: Subscription;
  private _selectedServerSubscription!: Subscription;
  private _selectedServer: string | null = null;
  private _hideDetails = false;
  private _header = '';
  private _xAxisName = '';
  private _yAxisName = '';
  private _dataUnit: string = '';
  public toggleChart = false;
  public updateOptions: EChartsOption = {};
  public isLoading = true;
  public options: EChartsOption = {};
  public theme: string = DEFAULT_THEME === 'theme-brand-light' ? 'brand-light' : 'brand-dark';

  @Input()
  public get yAxisName() {
    return this._yAxisName;
  }
  public set yAxisName(value) {
    this._yAxisName = value;
  }

  @Input()
  public get xAxisName() {
    return this._xAxisName;
  }
  public set xAxisName(value) {
    this._xAxisName = value;
  }

  @Input()
  public get dataUnit() {
    return this._dataUnit;
  }
  public set dataUnit(value) {
    isValidString(value) ? (this._dataUnit = value) : (this._dataUnit = '');
  }

  @Input()
  public get header(): string {
    return this._header;
  }

  public set header(value: string) {
    this._header = value;
  }

  @Input()
  public get hideDetails(): boolean {
    return this._hideDetails;
  }

  public set hideDetails(value: boolean) {
    this._hideDetails = value;
  }

  @Input()
  public get inputData(): Map<string, SeriesOption> {
    return new Map();
  }

  public set inputData(lineSeriesMap: Map<string, SeriesOption>) {
    if (lineSeriesMap && lineSeriesMap.size > 0) {
      this.isLoading = false;
      this.updateOptions = {
        series: [...lineSeriesMap.values()],
      };
    } else {
      this.isLoading = true;
    }
  }

  constructor(private messengerService: MessengerService) {
    this._selectedThemeSubscription = this.messengerService.selectedThemeObservable$.subscribe({
      next: (newTheme) => {
        if (newTheme) {
          if (newTheme === 'theme-brand-dark') {
            this.theme = 'brand-dark';
          } else {
            this.theme = 'brand-light';
          }
        }
      },
    });

    this._selectedServerSubscription = this.messengerService.selectedServerNameObservable$.subscribe({
      next: (selectedServer) => {
        this._selectedServer = selectedServer;
      },
    });
  }

  ngOnDestroy(): void {
    this._selectedThemeSubscription?.unsubscribe();
    this._selectedServerSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.options = {
      title: {
        show: isValidString(this.header),
        text: this.header,
        textStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        },
        left: '7.5%', // Adjust the left offset to match the axes
        bottom: 30, // Distance from the bottom of the chart
        textAlign: 'left', // Align the title to the left
      },
      formatter: (params: any[]) => {
        if (params.length === 0) return '';

        const selectedServer = this._selectedServer;

        // If there is no selected server, show all series normally
        const filteredParams = selectedServer ? params.filter((param) => param.seriesName === selectedServer) : params;

        // If no series matches the selected server, return an empty string
        if (filteredParams.length === 0) return '';

        const date = formatToReaderFriendlyDateTooltip(filteredParams[0].axisValue);
        const tooltipItems = filteredParams.map((param) => {
          return `
            <div style="display: flex; justify-content: space-between;">
              <span>${param.marker} ${param.seriesName}</span>
              <span>${param.value[1]} ${this._dataUnit}</span>
            </div>
          `;
        });
      
        return `
          <div style="display: flex; justify-content: space-between; font-weight: bold;">
            <span>${date}</span>
          </div>
          ${tooltipItems.join('')}
        `;
      },
      tooltip: {
        show: !this.hideDetails, // Show tooltip if hideDetails is false
        trigger: 'axis',
        valueFormatter: (value) => {
          return value + ' ' + this._dataUnit;
        },
        position: function (pt: any[]) {
          return [pt[0], '1%'];
        },
      },
      xAxis: {
        name: this.xAxisName,
        type: 'time',
        interval: environment.dataRententionTimeInSeconds / environment.pollingIntervalInSeconds,
        axisTick: {
          show: !this.hideDetails,
        },
        silent: this.hideDetails,
        alignTicks: true,
        axisPointer: {
          show: !this.hideDetails, // Show axis pointer if hideDetails is false
          snap: true,
          label: {
            show: !this.hideDetails, // Show axis pointer label if hideDetails is false
            formatter: function (params: any) {
              const date = new Date(params.value);
              return formatToReaderFriendlyDateTooltip(date);
            },
          },
          handle: {
            show: !this.hideDetails, // Show axis pointer handle if hideDetails is false
            size: 10,
            margin: 15,
            color: '#333',
          },
        },
        axisLabel: {
          show: !this.hideDetails, // Show axis labels if hideDetails is false
          rotate: calculateLabelRotationAngle(),
          formatter: function (value: any) {
            const date = new Date(value);
            return formatToReaderFriendlyDateLabel(date);
          },
        },
      },
      yAxis: {
        name: this.yAxisName,
        type: 'value',
        silent: this.hideDetails,
        splitLine: {
          show: !this.hideDetails,
        },
        axisLine: {
          show: true, // Show yAxis line
        },
        axisLabel: {
          show: !this.hideDetails, // Show yAxis labels if hideDetails is false
          formatter: `{value}${this._dataUnit}`,
        },
      },
      series: [],
    };
  }

  @HostListener('window:resize')
  onResize() {
    this.updateOptions = {
      xAxis: {
        axisLabel: {
          rotate: calculateLabelRotationAngle(),
        },
      },
    };
  }
}
