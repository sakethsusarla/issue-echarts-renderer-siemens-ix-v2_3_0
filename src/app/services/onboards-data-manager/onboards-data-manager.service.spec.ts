import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { AtoSystemDto } from 'src/app/core';
import { MockDataGeneratorService } from '../mock-data-generator/mock-data-generator.service';
import { OnboardsDataManagerService } from './onboards-data-manager.service';

describe('OnboardsDataManagerService', () => {
  let onboardsDataManagerService: OnboardsDataManagerService;
  let mockDataGeneratorService: MockDataGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    onboardsDataManagerService = TestBed.inject(OnboardsDataManagerService);
    mockDataGeneratorService = TestBed.inject(MockDataGeneratorService);
  });

  it('should be created', () => {
    expect(onboardsDataManagerService).toBeTruthy();
  });

  it('should initialize onboardsDataObservable$ as observable', () => {
    expect(onboardsDataManagerService.onboardsDataObservable$).toBeDefined();

    expect(onboardsDataManagerService.onboardsDataObservable$ instanceof Observable).toBe(true);
  });

  it('should initialize _onboardsDataMapSubject as BehaviorSubject with an empty map', () => {
    expect(onboardsDataManagerService['_onboardsDataMapSubject']).toBeDefined();

    expect(onboardsDataManagerService['_onboardsDataMapSubject'] instanceof BehaviorSubject).toBe(true);

    expect(onboardsDataManagerService['_onboardsDataMapSubject'].getValue()).toEqual(new Map());
  });

  it('should unsubscribe from all subscriptions when destroyed', () => {
    const onboardDataSubscriptionSpy = spyOn(onboardsDataManagerService['_serverDataSubscription'], 'unsubscribe').and.callThrough();

    // Manually call the ngOnDestroy method
    onboardsDataManagerService.ngOnDestroy();

    // Expect the unsubscribe methods to have been called
    expect(onboardDataSubscriptionSpy).toHaveBeenCalled();
  });

  it('should update onboardsDataMap when new server data is received', () => {
    const testOnboardDataMap = mockDataGeneratorService.generateConnectedOnboardsDtoMap();
    const mockAtoSystemDataMap: Map<string, AtoSystemDto> = new Map();

    testOnboardDataMap.forEach((onboardsData, serverName) => {
      mockAtoSystemDataMap.set(serverName, {
        connectedOnboards: onboardsData,
      } as AtoSystemDto);
    });

    onboardsDataManagerService['handleNewData'](mockAtoSystemDataMap);

    expect(onboardsDataManagerService['_onboardsDataMapSubject'].getValue()).toEqual(testOnboardDataMap);
  });

  it('should remove server data from onboardsDataMap when corresponding server data is removed', () => {
    const testOnboardDataMap = mockDataGeneratorService.generateConnectedOnboardsDtoMap();
    const mockAtoSystemDataMap: Map<string, AtoSystemDto> = new Map();

    testOnboardDataMap.forEach((onboardsData, serverName) => {
      mockAtoSystemDataMap.set(serverName, {
        connectedOnboards: onboardsData,
      } as AtoSystemDto);
    });

    onboardsDataManagerService['handleNewData'](mockAtoSystemDataMap);

    expect(onboardsDataManagerService['_onboardsDataMapSubject'].getValue()).toEqual(testOnboardDataMap);

    const keys = [...mockAtoSystemDataMap.keys()];

    mockAtoSystemDataMap.delete(keys[Math.random() * keys.length]);

    onboardsDataManagerService['handleNewData'](mockAtoSystemDataMap);

    expect(onboardsDataManagerService['_onboardsDataMapSubject'].getValue()).toEqual(testOnboardDataMap);
  });
});