import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption, SeriesOption } from 'echarts';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent implements OnInit {
  hideDetails = false;
  header = 'Minimal Line Chart Example';
  xAxisName = 'time';
  yAxisName = 'devices';
  private _dataUnit: string = '';
  public toggleChart = false;
  public updateOptions: EChartsOption = {};
  public isLoading = true;
  public options: EChartsOption = {};

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

  constructor() {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    setTimeout(() => {
      this.inputData = new Map([
        [
          'Series 1',
          {
            name: 'Series 1',
            type: 'line',
            data: [
              [0, 820],
              [1, 932],
              [2, 901],
              [3, 934],
              [4, 1290],
              [5, 1330],
              [6, 1320],
            ],
          },
        ],
        [
          'Series 2',
          {
            name: 'Series 2',
            type: 'line',
            data: [
              [0, 620],
              [1, 732],
              [2, 701],
              [3, 734],
              [4, 1090],
              [5, 1130],
              [6, 1120],
            ],
          },
        ],
      ]);
    }, 2000);

    this.options = {
      title: {
        show: true,
        text: this.header,
        textStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        },
        left: '7.5%', // Adjust the left offset to match the axes
        bottom: 30, // Distance from the bottom of the chart
        textAlign: 'left', // Align the title to the left
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
        interval: 12,
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
              return date.toLocaleString();
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
          formatter: function (value: any) {
            const date = new Date(value);
            return date.toISOString();
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
}
