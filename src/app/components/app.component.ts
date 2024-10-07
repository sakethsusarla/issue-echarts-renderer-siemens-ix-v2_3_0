import { Component, OnInit } from '@angular/core';
import { SeriesOption } from 'echarts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public data: Map<string, SeriesOption> = new Map();

  ngOnInit(): void {
    setTimeout(() => {
      this.data = new Map([
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
  }
}
