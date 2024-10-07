import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { SeriesOption } from 'echarts';
import { BehaviorSubject, Observable, Subscription, interval, switchMap } from 'rxjs';
import { DateNumberTuple, ValueDto, createLineSeriesOption, isValidString, updateVisibilityForLineChart } from 'src/app/core';
import { environment } from 'src/environments/environment';
import { MessengerService } from '../messenger/messenger.service';
import { MockDataGeneratorService } from '../mock-data-generator/mock-data-generator.service';

@Injectable({
  providedIn: 'root',
})
export class OnboardsHistoricalDataManagerService implements OnDestroy {
  private readonly _onboardsHistoricalDataMapSubject: BehaviorSubject<Map<string, SeriesOption>>;
  private _onboardsHistoricalDataSubscription!: Subscription;
  private _selectedServerSubscription!: Subscription;
  private _selectedServer: string = '';
  public onboardsHistoricalDataObservable$: Observable<Map<string, SeriesOption>>;

  constructor(private httpClient: HttpClient, private messengerService: MessengerService, private mockDataManagerService: MockDataGeneratorService) {
    this._onboardsHistoricalDataMapSubject = new BehaviorSubject<Map<string, SeriesOption>>(new Map());
    this.onboardsHistoricalDataObservable$ = this._onboardsHistoricalDataMapSubject.asObservable();

    this._selectedServerSubscription = this.messengerService.selectedServerNameObservable$.subscribe({
      next: (selectedServer: string | null) => {
        isValidString(selectedServer) ? (this.selectedServer = selectedServer!) : (this.selectedServer = '');
      },
    });

    const dataSource$: Observable<{ [key: string]: ValueDto[] }> = environment.useSimulatedData
      ? this.mockDataManagerService.onboardsHistoricalDataObservable$
      : interval(environment.pollingIntervalInSeconds * 1000).pipe(
          switchMap(() => this.httpClient.get<{ [key: string]: ValueDto[] }>(environment.serverUrl + environment.onboardUnitsHistoricalDataEndpoint))
        );

    this._onboardsHistoricalDataSubscription = dataSource$.subscribe((resp: { [key: string]: ValueDto[] }) => {
      this.handleNewData(new Map(Object.entries(resp)));
    });
  }

  private set selectedServer(value: string) {
    this._selectedServer = value;

    const lineChartDataMap = this._onboardsHistoricalDataMapSubject.getValue();
    updateVisibilityForLineChart(this._selectedServer, lineChartDataMap);

    this._onboardsHistoricalDataMapSubject.next(lineChartDataMap);
  }

  ngOnDestroy(): void {
    this._selectedServerSubscription?.unsubscribe();
    this._onboardsHistoricalDataSubscription?.unsubscribe();
  }

  private handleNewData(newOnboardsHistoricalDataMap: Map<string, ValueDto[]>) {
    if (!newOnboardsHistoricalDataMap) {
      this._onboardsHistoricalDataMapSubject.next(new Map());
    }

    const onboardsLineChartDataMap = this._onboardsHistoricalDataMapSubject.getValue();
    const existingServerNames = [...onboardsLineChartDataMap.keys()];

    newOnboardsHistoricalDataMap.forEach((onboardsData, serverName) => {
      const isHidden = isValidString(this._selectedServer) && serverName != this._selectedServer;
      onboardsLineChartDataMap.set(
        serverName,
        createLineSeriesOption(
          serverName,
          isHidden,
          onboardsData.map((e) => [new Date(e.timestamp), Number(e.value)] as DateNumberTuple)
        )
      );
    });

    existingServerNames.forEach((s) => {
      if (!newOnboardsHistoricalDataMap.has(s)) {
        onboardsLineChartDataMap.delete(s);
      }
    });

    this._onboardsHistoricalDataMapSubject.next(onboardsLineChartDataMap);
  }
}
