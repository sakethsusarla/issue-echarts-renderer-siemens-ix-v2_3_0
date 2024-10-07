import { Component, Input, OnDestroy } from '@angular/core';
import { SeriesOption } from 'echarts';
import { Subscription } from 'rxjs';
import { CONNECTED_ONBOARDS_LITERAL, DEFAULT_THEME } from 'src/app/core';
import { MessengerService } from 'src/app/services';
import { OnboardsHistoricalDataManagerService } from 'src/app/services/onboards-historical-data-manager/onboards-historical-data-manager.service';

@Component({
  selector: 'connected-onboards-summary',
  templateUrl: './connected-onboards-summary.component.html',
  styleUrls: ['./connected-onboards-summary.component.scss'],
})
export class ConnectedOnboardsSummaryComponent implements OnDestroy {
  private _connectedOnboardsChartDataSubscription!: Subscription;
  private _selectedThemeSubscription!: Subscription;
  private _disableLinks = false;
  public onboardsLineChartDataMap: Map<string, SeriesOption> = new Map();
  public connectedOnboardsTitleText = CONNECTED_ONBOARDS_LITERAL;
  public selectedTheme = DEFAULT_THEME;

  @Input()
  public get disableLinks() {
    return this._disableLinks;
  }
  public set disableLinks(value) {
    this._disableLinks = value;
  }

  constructor(private onboardsHistoricalDataManagerService: OnboardsHistoricalDataManagerService, private messengerService: MessengerService) {
    this._connectedOnboardsChartDataSubscription = this.onboardsHistoricalDataManagerService.onboardsHistoricalDataObservable$.subscribe({
      next: (onboardsLineChartDataMap: Map<string, SeriesOption>) => {
        if (!onboardsLineChartDataMap) {
          this.onboardsLineChartDataMap = new Map();
          return;
        }

        this.onboardsLineChartDataMap = new Map(onboardsLineChartDataMap);
      },
    });

    this._selectedThemeSubscription = this.messengerService.selectedThemeObservable$.subscribe({
      next: (theme) => {
        if (theme) {
          this.selectedTheme = theme;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this._connectedOnboardsChartDataSubscription?.unsubscribe();
    this._selectedThemeSubscription?.unsubscribe();
  }
}
