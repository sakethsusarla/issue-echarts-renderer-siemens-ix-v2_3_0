import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessengerService } from '../messenger/messenger.service';
import { MockDataGeneratorService } from '../mock-data-generator/mock-data-generator.service';
import { ServerDataManagerService } from './server-data-manager.service';
import { AtoSystemDto } from 'src/app/core';
import { HttpClient } from '@angular/common/http';

describe('ServerDataManagerService', () => {
  let serverDataManagerService: ServerDataManagerService;
  let httpMock: HttpTestingController;
  let mockDataGeneratorService: MockDataGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    serverDataManagerService = TestBed.inject(ServerDataManagerService);
    httpMock = TestBed.inject(HttpTestingController);
    mockDataGeneratorService = TestBed.inject(MockDataGeneratorService);
  });

  it('should be created', () => {
    expect(serverDataManagerService).toBeTruthy();
  });

  it('should initialize filteredServerDataObservable$ and serverDataObservable$ as observables', () => {
    expect(serverDataManagerService.filteredServerDataObservable$).toBeDefined();
    expect(serverDataManagerService.serverDataObservable$).toBeDefined();

    expect(serverDataManagerService.filteredServerDataObservable$ instanceof Observable).toBe(true);
    expect(serverDataManagerService.serverDataObservable$ instanceof Observable).toBe(true);
  });

  it('should initialize _filteredServerDataSubject and _serverDataSubject as BehaviorSubjects with an empty map', () => {
    expect(serverDataManagerService['_filteredServerDataSubject']).toBeDefined();
    expect(serverDataManagerService['_serverDataSubject']).toBeDefined();

    expect(serverDataManagerService['_filteredServerDataSubject'] instanceof BehaviorSubject).toBe(true);
    expect(serverDataManagerService['_serverDataSubject'] instanceof BehaviorSubject).toBe(true);

    expect(serverDataManagerService['_filteredServerDataSubject'].getValue().size).toBe(0);
    expect(serverDataManagerService['_serverDataSubject'].getValue().size).toBe(0);
  });

  it('should properly update filteredServerDataObservable$ when _selectedServer changes', () => {
    const testDataMap = mockDataGeneratorService.generateNewAtoSystemsData(new Date());
    const selectedIndex = Math.floor(Math.random() * Object.entries(testDataMap).length);
    const selectedServerName = Object.keys(testDataMap)[selectedIndex];
    const selectedServerData = Object.values(testDataMap)[selectedIndex];

    // Step 1: Set the _selectedServer and _serverDataSubject to the test data
    serverDataManagerService['_selectedServer'] = selectedServerName;
    serverDataManagerService['_serverDataSubject'].next(new Map(Object.entries(testDataMap)));

    // Step 2: Trigger the filtering process
    serverDataManagerService['filterAndSendLatestServerData']();

    // Step 3: Expect filteredServerDataObservable$ to have the filtered data
    serverDataManagerService.filteredServerDataObservable$.subscribe({
      next: (result) => {
        expect(result.size).toBe(1);
        expect(result.has(selectedServerName)).toBe(true);
        expect(result.get(selectedServerName)).toBe(selectedServerData);
      },
      error: (error) => {
        fail(error);
      },
    });
  });

  it('should unsubscribe from all subscriptions when destroyed', () => {
    const selectedServerSubscriptionSpy = spyOn(serverDataManagerService['_selectedServerSubscription'], 'unsubscribe').and.callThrough();
    const serverDataSubscriptionSpy = spyOn(serverDataManagerService['_serverDataSubscription'], 'unsubscribe').and.callThrough();

    // Manually call the ngOnDestroy method
    serverDataManagerService.ngOnDestroy();

    // Expect the unsubscribe methods to have been called
    expect(selectedServerSubscriptionSpy).toHaveBeenCalled();
    expect(serverDataSubscriptionSpy).toHaveBeenCalled();
  });

  it('should use httpClient.get when useSimulatedData is false', () => {
    // Set the useSimulatedData flag to false
    Object.defineProperty(environment, 'useSimulatedData', { get: () => false });

    // Manually call the constructor to ensure the service is initialized
    serverDataManagerService = new ServerDataManagerService(TestBed.inject(HttpClient), mockDataGeneratorService, TestBed.inject(MessengerService));

    // Define the expected URL and endpoint
    const expectedUrl = environment.serverUrl + environment.systemsDataEndpoint;

    // Expect the httpClient.get method to be called with the correct URL and endpoint
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');

    // Respond with some mock data
    const mockResponse = { key: { value: 'Mock Data' } };
    req.flush(mockResponse);

    // Verify that the serverDataObservable$ emits the mock response
    serverDataManagerService.serverDataObservable$.subscribe((data) => {
      expect(data).toEqual(new Map(Object.entries(mockResponse)));
    });
  });

  it('should use the dataObservable$ from MockDataGeneratorService when useSimulatedData is true', () => {
    // Set the useSimulatedData flag to false
    Object.defineProperty(environment, 'useSimulatedData', { get: () => true });

    // Mock the data to be returned by MockDataGeneratorService
    const mockData = mockDataGeneratorService.generateNewAtoSystemsData(new Date());

    serverDataManagerService['_serverDataSubject'].next(new Map(Object.entries(mockData)));

    serverDataManagerService['filterAndSendLatestServerData']();

    // Check if the _filteredServerDataSubject was updated with the expected data from MockDataGeneratorService
    serverDataManagerService.filteredServerDataObservable$.subscribe((filteredData) => {
      expect(filteredData).toEqual(new Map<string, AtoSystemDto>(Object.entries(mockData)));
    });

    // Check if the _serverDataSubject was updated with the expected data from MockDataGeneratorService
    serverDataManagerService.serverDataObservable$.subscribe((serverData) => {
      expect(serverData).toEqual(new Map<string, AtoSystemDto>(Object.entries(mockData)));
    });
  });
});