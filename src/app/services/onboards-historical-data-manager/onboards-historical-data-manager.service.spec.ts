import { TestBed } from '@angular/core/testing';

import { OnboardsHistoricalDataManagerService } from './onboards-historical-data-manager.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockDataGeneratorService } from '../mock-data-generator/mock-data-generator.service';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AtoSystemDto } from 'src/app/core';
import { environment } from 'src/environments/environment';

describe('OnboardsHistoricalDataManagerService', () => {
  let onboardsHistoricalDataManagerService: OnboardsHistoricalDataManagerService;
  let mockDataGeneratorService: MockDataGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    onboardsHistoricalDataManagerService = TestBed.inject(OnboardsHistoricalDataManagerService);
    mockDataGeneratorService = TestBed.inject(MockDataGeneratorService);
  });

  it('should be created', () => {
    expect(onboardsHistoricalDataManagerService).toBeTruthy();
  });

  it('should initialize onboardsHistoricalDataObservable$ as observables', () => {
    expect(onboardsHistoricalDataManagerService.onboardsHistoricalDataObservable$).toBeDefined();

    expect(onboardsHistoricalDataManagerService.onboardsHistoricalDataObservable$ instanceof Observable).toBe(true);
  });

  it('should initialize _onboardsHistoricalDataMapSubject as BehaviorSubjects with an empty map', () => {
    expect(onboardsHistoricalDataManagerService['_onboardsHistoricalDataMapSubject']).toBeDefined();

    expect(onboardsHistoricalDataManagerService['_onboardsHistoricalDataMapSubject'] instanceof BehaviorSubject).toBe(true);

    expect(onboardsHistoricalDataManagerService['_onboardsHistoricalDataMapSubject'].getValue().size).toBe(0);
  });

  it('should unsubscribe from all subscriptions when destroyed', () => {
    const onboardsHistoricalDataSubscriptionSpy = spyOn(onboardsHistoricalDataManagerService['_onboardsHistoricalDataSubscription'], 'unsubscribe').and.callThrough();

    // Manually call the ngOnDestroy method
    onboardsHistoricalDataManagerService.ngOnDestroy();

    // Expect the unsubscribe methods to have been called
    expect(onboardsHistoricalDataSubscriptionSpy).toHaveBeenCalled();
  });

  it('should properly update onboardsHistoricalDataObservable$ when _selectedServer changes', () => {
    const testDataMap = mockDataGeneratorService.generateHistoricalDataMap;
    const selectedIndex = Math.floor(Math.random() * Object.entries(testDataMap).length);
    const selectedServerName = Object.keys(testDataMap)[selectedIndex];
    const selectedServerData = Object.values(testDataMap)[selectedIndex];

    // Step 1: Set the _selectedServer and _serverDataSubject to the test data
    onboardsHistoricalDataManagerService['_selectedServer'] = selectedServerName;
    onboardsHistoricalDataManagerService['_onboardsHistoricalDataMapSubject'].next(new Map(Object.entries(testDataMap)));

    // Step 3: Expect filteredServerDataObservable$ to have the filtered data
    onboardsHistoricalDataManagerService.onboardsHistoricalDataObservable$.subscribe({
      next: (result) => {
        expect(result.size).toBe(0);
        expect(result.get(selectedServerName)).toBe(selectedServerData);
      },
      error: (error) => {
        fail(error);
      },
    });
  });

  it('should use the onboardsHistoricalDataObservable$ from MockDataGeneratorService when useSimulatedData is true', () => {
    // Set the useSimulatedData flag to false
    Object.defineProperty(environment, 'useSimulatedData', { get: () => true });

    // Mock the data to be returned by MockDataGeneratorService
    const mockData = mockDataGeneratorService.generateHistoricalDataMap;

    onboardsHistoricalDataManagerService['_onboardsHistoricalDataMapSubject'].next(new Map(Object.entries(mockData)));

    // Check if the _onboardsHistoricalDataMapSubject was updated with the expected data from MockDataGeneratorService
    onboardsHistoricalDataManagerService.onboardsHistoricalDataObservable$.subscribe((serverData) => {
      expect(serverData).toEqual(new Map<string, AtoSystemDto>(Object.entries(mockData)));
    });
  });
});