import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, concat, interval, switchMap } from 'rxjs';
import { AtoSystemDto, isValidString } from 'src/app/core';
import { MessengerService, MockDataGeneratorService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServerDataManagerService implements OnDestroy {
  private readonly _filteredServerDataSubject: BehaviorSubject<Map<string, AtoSystemDto>>;
  private readonly _serverDataSubject: BehaviorSubject<Map<string, AtoSystemDto>>;
  private _selectedServerSubscription!: Subscription;
  private _serverDataSubscription!: Subscription;
  private _selectedServer: string = '';

  public filteredServerDataObservable$: Observable<Map<string, AtoSystemDto>>;
  public serverDataObservable$: Observable<Map<string, AtoSystemDto>>;

  constructor(private httpClient: HttpClient, private mock: MockDataGeneratorService, private messengerService: MessengerService) {
    this._filteredServerDataSubject = new BehaviorSubject<Map<string, AtoSystemDto>>(new Map<string, AtoSystemDto>());

    this._serverDataSubject = new BehaviorSubject<Map<string, AtoSystemDto>>(new Map<string, AtoSystemDto>());

    this.filteredServerDataObservable$ = this._filteredServerDataSubject.asObservable();

    this.serverDataObservable$ = this._serverDataSubject.asObservable();

    this._selectedServerSubscription = this.messengerService.selectedServerNameObservable$.subscribe({
      next: (v) => {
        isValidString(v) ? (this._selectedServer = v!) : (this._selectedServer = '');
        this.filterAndSendLatestServerData();
      },
    });

    const dataSource$: Observable<{ [key: string]: AtoSystemDto }> = environment.useSimulatedData
      ? this.mock.dataObservable$
      : concat(
          // Fire an immediate request
          this.httpClient.get<{ [key: string]: AtoSystemDto }>(environment.serverUrl + environment.systemsDataEndpoint),
          // Repeat the request with the specified interval
          interval(environment.pollingIntervalInSeconds * 1000).pipe(
            switchMap(() => this.httpClient.get<{ [key: string]: AtoSystemDto }>(environment.serverUrl + environment.systemsDataEndpoint))
          )
        );

    this._serverDataSubscription = dataSource$.subscribe((resp: { [key: string]: AtoSystemDto }) => {
      if (!resp) {
        return;
      }

      this._serverDataSubject.next(new Map<string, AtoSystemDto>(Object.entries(resp)));
      this.filterAndSendLatestServerData();
    });
  }

  ngOnDestroy(): void {
    this._selectedServerSubscription?.unsubscribe();
    this._serverDataSubscription?.unsubscribe();
  }

  private filterAndSendLatestServerData() {
    const filteredMap = new Map<string, AtoSystemDto>();
    const latestServerData = this._serverDataSubject.getValue();

    if (isValidString(this._selectedServer) && latestServerData.has(this._selectedServer)) {
      filteredMap.set(this._selectedServer, latestServerData.get(this._selectedServer)!);

      this._filteredServerDataSubject.next(filteredMap);
    } else {
      this._filteredServerDataSubject.next(latestServerData);
    }
  }
}
