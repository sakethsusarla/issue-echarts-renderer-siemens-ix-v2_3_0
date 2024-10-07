import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DEFAULT_THEME, SupportedThemeType } from 'src/app/core';

@Injectable({
  providedIn: 'root',
})
export class MessengerService {
  private _selectedServerNameSubject: BehaviorSubject<string | null>;
  private _selectedThemeSubject: BehaviorSubject<SupportedThemeType>;

  public selectedServerNameObservable$: Observable<string | null>;
  public selectedThemeObservable$: Observable<SupportedThemeType>;

  constructor() {
    this._selectedServerNameSubject = new BehaviorSubject<string | null>(null);
    this._selectedThemeSubject = new BehaviorSubject<SupportedThemeType>(DEFAULT_THEME);

    this.selectedServerNameObservable$ = this._selectedServerNameSubject.asObservable();
    this.selectedThemeObservable$ = this._selectedThemeSubject.asObservable();
  }

  public changeSelectedServerName(serverName: string) {
    if (serverName) {
      this._selectedServerNameSubject.next(serverName);
    } else {
      this._selectedServerNameSubject.next('');
    }
  }

  public changeSelectedTheme(selectedTheme: SupportedThemeType) {
    if (selectedTheme) {
      this._selectedThemeSubject.next(selectedTheme);
    }
  }
}
