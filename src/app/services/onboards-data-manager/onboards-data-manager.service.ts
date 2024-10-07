import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AtoSystemDto, ConnectedOnboardDto } from 'src/app/core';
import { ServerDataManagerService } from 'src/app/services';

@Injectable({
  providedIn: 'root',
})
export class OnboardsDataManagerService {
  private _serverDataSubscription!: Subscription;
  private readonly _onboardsDataMapSubject: BehaviorSubject<Map<string, ConnectedOnboardDto[]>>;
  public onboardsDataObservable$: Observable<Map<string, ConnectedOnboardDto[]>>;

  constructor(private serverDataManagerService: ServerDataManagerService) {
    this._onboardsDataMapSubject = new BehaviorSubject<Map<string, ConnectedOnboardDto[]>>(new Map());
    this.onboardsDataObservable$ = this._onboardsDataMapSubject.asObservable();
    this._serverDataSubscription = this.serverDataManagerService.filteredServerDataObservable$.subscribe({
      next: (serversDataMap: Map<string, AtoSystemDto>) => {
        if (!serversDataMap) {
          return;
        }

        this.handleNewData(serversDataMap);
      },
    });
  }

  ngOnDestroy(): void {
    this._serverDataSubscription?.unsubscribe();
  }

  private handleNewData(serversDataMap: Map<string, AtoSystemDto>) {
    const onboardsDataMap = this._onboardsDataMapSubject.getValue();
    const exisitingServerNames = [...onboardsDataMap.keys()];

    serversDataMap.forEach((serverData, serverName) => {
      onboardsDataMap.set(serverName, serverData.connectedOnboards);
    });

    exisitingServerNames.forEach((s) => {
      if (!serversDataMap.has(s)) {
        onboardsDataMap.delete(s);
      }
    });

    this._onboardsDataMapSubject.next(onboardsDataMap);
  }
}
