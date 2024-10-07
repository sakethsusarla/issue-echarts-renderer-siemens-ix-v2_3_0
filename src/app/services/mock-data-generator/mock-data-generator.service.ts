import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, interval } from 'rxjs';
import {
	ApplicationsDto,
	AssociatedAtoProcessMetricsDto,
	AtoApplicationDto,
	AtoSystemDto,
	AtoTrackAreaDto,
	BasicApplicationInformationDto,
	CertificateDto,
	ConnectedOnboardDto,
	CpuDto,
	FileSystemDto,
	RaidDeviceDto,
	RaidDiskInformationDto,
	ValueDto,
	VersionsDataContainerType,
} from 'src/app/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MockDataGeneratorService {
  private _dataSubject = new Subject<{ [key: string]: AtoSystemDto }>();
  private _onboardsHistoricalDataSubject = new Subject<{ [key: string]: ValueDto[] }>();
  private _subscription!: Subscription;
  private _sourceDataMap: { [key: string]: AtoSystemDto } = {};
  public dataObservable$ = this._dataSubject.asObservable();
  public onboardsHistoricalDataObservable$: Observable<{ [key: string]: ValueDto[] }> = this._onboardsHistoricalDataSubject.asObservable();

  constructor() {
    const jsonData = `{
	"Server Alpha": {
		"cpu": {
			"identifier": {
				"value": "Intel(R) Core(TM)2 Duo CPU T7300 @ 3.00GHz",
				"timestamp": "2023-05-25T00:00:00Z"
			},
			"currentFrequency": {
				"value": "1750000000",
				"timestamp": "2023-05-25T00:00:00Z"
			},
			"cpuLoad": {
				"value": "70",
				"timestamp": "2023-05-25T00:00:00Z"
			},
			"temperature": {
				"value": "50",
				"timestamp": "2023-05-25T00:00:00Z"
			}
		},
		"ram": {
			"usedMemory": {
				"value": "32123",
				"timestamp": "2023-05-25T00:00:00Z"
			},
			"totalMemory": {
				"value": "64000",
				"timestamp": "2023-05-25T00:00:00Z"
			}
		},
		"applications": {
			"atoCore": {
				"associatedProcesses": [
					{
						"cpuUsage": {
							"value": "10",
							"timestamp": "2023-05-25T00:00:00Z"
						},
						"isExecuting": {
							"value": "true",
							"timestamp": "2023-05-25T00:00:00Z"
						},
						"memoryConsumption": {
							"value": "345678",
							"timestamp": "2023-05-25T00:00:00Z"
						},
						"pid": {
							"value": "1234",
							"timestamp": "2023-05-25T00:00:00Z"
						},
						"processName": {
							"value": "java",
							"timestamp": "2023-05-25T00:00:00Z"
						},
						"upTime": {
							"value": "345532",
							"timestamp": "2023-05-25T00:00:00Z"
						}
					}
				],
				"manufacturer": {
					"value": "Siemens Mobility GmbH",
					"timestamp": "2023-05-25T00:00:00Z"
				},
				"productName": {
					"value": "ATO TS",
					"timestamp": "2023-05-25T00:00:00Z"
				},
				"version": {
					"value": "0.6",
					"timestamp": "2023-05-25T00:00:00Z"
				}
			}
		},
		"connectedOnboards": [
			{
				"atoState": {
					"value": "ENGAGED",
					"timestamp": "2023-05-25T00:00:00Z"
				},
				"currentSegment": {
					"nidC": {
						"value": "123",
						"timestamp": "2023-05-25T00:00:00Z"
					},
					"nidSp": {
						"value": "456",
						"timestamp": "2023-05-25T00:00:00Z"
					},
					"position": {
						"value": "10",
						"timestamp": "2023-05-25T00:00:00Z"
					}
				},
				"nidEngine": {
					"value": "5678",
					"timestamp": "2023-05-25T00:00:00Z"
				},
				"nidOperational": {
					"value": "1234",
					"timestamp": "2023-05-25T00:00:00Z"
				},
				"previousTimingPoint": {},
				"Q_STR_Indicators": {},
				"runningVersion": {
					"value": "1.6",
					"timestamp": "2023-05-25T00:00:00Z"
				},
				"timingPointEstimations": [
					{
						"name": {
							"value": "TP-ABC-123",
							"timestamp": "2023-05-25T00:00:00Z"
						},
						"nidC": {
							"value": "123",
							"timestamp": "2023-05-25T00:00:00Z"
						},
						"nidTp": {
							"value": "789",
							"timestamp": "2023-05-25T00:00:00Z"
						},
						"estimatedArrival": {
							"value": "2023-05-25T10:00:00Z",
							"timestamp": "2023-05-25T00:00:00Z"
						}
					}
				],
				"trainSpeed": {
					"value": "65",
					"timestamp": "2023-05-25T00:00:00Z"
				}
			}
		],
		"fileSystems": [
			{
				"identifier": {
					"value": "logs",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"mount": {
					"value": "/mnt/logs",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"totalSpace": {
					"value": "48640",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"type": {
					"value": "EXT4",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"usableSpace": {
					"value": "19456",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"uuid": {
					"value": "98765432",
					"timestamp": "2023-05-25T12:00:00Z"
				}
			},
			{
				"identifier": {
					"value": "config",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"mount": {
					"value": "/mnt/config",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"totalSpace": {
					"value": "40960",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"type": {
					"value": "EXT4",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"usableSpace": {
					"value": "16384",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"uuid": {
					"value": "98005432",
					"timestamp": "2023-05-25T12:00:00Z"
				}
			},
			{
				"identifier": {
					"value": "app",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"mount": {
					"value": "/mnt/app",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"totalSpace": {
					"value": "48640",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"type": {
					"value": "EXT4",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"usableSpace": {
					"value": "19456",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"uuid": {
					"value": "98700432",
					"timestamp": "2023-05-25T12:00:00Z"
				}
			}
		],
		"certificates": []
	},
	"Server Beta": {
		"cpu": {
			"identifier": {
				"value": "Intel(R) Core(TM)2 Duo CPU T8500 @ 3.00GHz",
				"timestamp": "2023-05-25T00:00:00Z"
			},
			"currentFrequency": {
				"value": "1640000000",
				"timestamp": "2023-05-25T00:00:00Z"
			},
			"cpuLoad": {
				"value": "47",
				"timestamp": "2023-05-25T00:00:00Z"
			},
			"temperature": {
				"value": "32",
				"timestamp": "2023-05-25T00:00:00Z"
			}
		},
		"ram": {
			"usedMemory": {
				"value": "32123",
				"timestamp": "2023-05-25T00:00:00Z"
			},
			"totalMemory": {
				"value": "64000",
				"timestamp": "2023-05-25T00:00:00Z"
			}
		},
		"applications": {
			"atoCore": {
				"associatedProcesses": [
					{
						"cpuUsage": {
							"value": "15",
							"timestamp": "2023-05-25T12:00:00Z"
						},
						"isExecuting": {
							"value": "true",
							"timestamp": "2023-05-25T12:00:00Z"
						},
						"memoryConsumption": {
							"value": "456789",
							"timestamp": "2023-05-25T12:00:00Z"
						},
						"pid": {
							"value": "5678",
							"timestamp": "2023-05-25T12:00:00Z"
						},
						"processName": {
							"value": "java",
							"timestamp": "2023-05-25T12:00:00Z"
						},
						"upTime": {
							"value": "567891",
							"timestamp": "2023-05-25T12:00:00Z"
						}
					}
				],
				"manufacturer": {
					"value": "Siemens Mobility GmbH",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"productName": {
					"value": "ATO TS",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"version": {
					"value": "0.7",
					"timestamp": "2023-05-25T12:00:00Z"
				}
			}
		},
		"connectedOnboards": [
			{
				"atoState": {
					"value": "IDLE",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"currentSegment": {
					"nidC": {
						"value": "456",
						"timestamp": "2023-05-25T12:00:00Z"
					},
					"nidSp": {
						"value": "789",
						"timestamp": "2023-05-25T12:00:00Z"
					},
					"position": {
						"value": "20",
						"timestamp": "2023-05-25T12:00:00Z"
					}
				},
				"nidEngine": {
					"value": "8765",
					"timestamp": "2023-05-25T00:00:00Z"
				},
				"nidOperational": {
					"value": "4321",
					"timestamp": "2023-05-25T00:00:00Z"
				},
				"previousTimingPoint": {},
				"Q_STR_Indicators": {},
				"runningVersion": {
					"value": "1.6",
					"timestamp": "2023-05-25T00:00:00Z"
				},
				"timingPointEstimations": [
					{
						"name": {
							"value": "TP-DEF-456",
							"timestamp": "2023-05-25T12:00:00Z"
						},
						"nidC": {
							"value": "456",
							"timestamp": "2023-05-25T12:00:00Z"
						},
						"nidTp": {
							"value": "101112",
							"timestamp": "2023-05-25T12:00:00Z"
						},
						"estimatedArrival": {
							"value": "2023-05-25T14:30:00Z",
							"timestamp": "2023-05-25T12:00:00Z"
						}
					}
				],
				"trainSpeed": {
					"value": "54",
					"timestamp": "2023-05-25T00:00:00Z"
				}
			}
		],
		"fileSystems": [
			{
				"identifier": {
					"value": "logs",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"mount": {
					"value": "/mnt/logs",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"totalSpace": {
					"value": "51200",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"type": {
					"value": "EXT4",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"usableSpace": {
					"value": "20480",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"uuid": {
					"value": "98765432",
					"timestamp": "2023-05-25T12:00:00Z"
				}
			},
			{
				"identifier": {
					"value": "config",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"mount": {
					"value": "/mnt/config",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"totalSpace": {
					"value": "45056",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"type": {
					"value": "EXT4",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"usableSpace": {
					"value": "18022",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"uuid": {
					"value": "98005432",
					"timestamp": "2023-05-25T12:00:00Z"
				}
			},
			{
				"identifier": {
					"value": "app",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"mount": {
					"value": "/mnt/app",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"totalSpace": {
					"value": "51200",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"type": {
					"value": "EXT4",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"usableSpace": {
					"value": "20480",
					"timestamp": "2023-05-25T12:00:00Z"
				},
				"uuid": {
					"value": "98700432",
					"timestamp": "2023-05-25T12:00:00Z"
				}
			}
		],
		"certificates": []
	},
	"Server Gamma": {
		"cpu": {
			"identifier": {
				"value": "Intel(R) Core(TM) i7-9700K CPU @ 3.60GHz",
				"timestamp": "2023-06-22T12:00:00Z"
			},
			"currentFrequency": {
				"value": "3000000000",
				"timestamp": "2023-06-22T12:00:00Z"
			},
			"cpuLoad": {
				"value": "80",
				"timestamp": "2023-06-22T12:00:00Z"
			},
			"temperature": {
				"value": "60",
				"timestamp": "2023-06-22T12:00:00Z"
			}
		},
		"ram": {
			"usedMemory": {
				"value": "41234",
				"timestamp": "2023-06-22T12:00:00Z"
			},
			"totalMemory": {
				"value": "83456",
				"timestamp": "2023-06-22T12:00:00Z"
			}
		},
		"applications": {
			"atoCore": {
				"associatedProcesses": [
					{
						"cpuUsage": {
							"value": "20",
							"timestamp": "2023-06-22T12:00:00Z"
						},
						"isExecuting": {
							"value": "false",
							"timestamp": "2023-06-22T12:00:00Z"
						},
						"memoryConsumption": {
							"value": "123456",
							"timestamp": "2023-06-22T12:00:00Z"
						},
						"pid": {
							"value": "5678",
							"timestamp": "2023-06-22T12:00:00Z"
						},
						"processName": {
							"value": "python",
							"timestamp": "2023-06-22T12:00:00Z"
						},
						"upTime": {
							"value": "7200",
							"timestamp": "2023-06-22T12:00:00Z"
						}
					}
				],
				"manufacturer": {
					"value": "Siemens AG",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"productName": {
					"value": "ATO TS Pro",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"version": {
					"value": "1.0",
					"timestamp": "2023-06-22T12:00:00Z"
				}
			}
		},
		"connectedOnboards": [
			{
				"atoState": {
					"value": "DISENGAGED",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"currentSegment": {
					"nidC": {
						"value": "789",
						"timestamp": "2023-06-22T12:00:00Z"
					},
					"nidSp": {
						"value": "012",
						"timestamp": "2023-06-22T12:00:00Z"
					},
					"position": {
						"value": "20",
						"timestamp": "2023-06-22T12:00:00Z"
					}
				},
				"nidEngine": {
					"value": "3456",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"nidOperational": {
					"value": "7890",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"previousTimingPoint": {},
				"Q_STR_Indicators": {},
				"runningVersion": {
					"value": "2.0",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"timingPointEstimations": [
					{
						"name": {
							"value": "TP-XYZ-789",
							"timestamp": "2023-06-22T12:00:00Z"
						},
						"nidC": {
							"value": "789",
							"timestamp": "2023-06-22T12:00:00Z"
						},
						"nidTp": {
							"value": "234",
							"timestamp": "2023-06-22T12:00:00Z"
						},
						"estimatedArrival": {
							"value": "2023-06-22T15:30:00Z",
							"timestamp": "2023-06-22T12:00:00Z"
						}
					}
				],
				"trainSpeed": {
					"value": "80",
					"timestamp": "2023-06-22T12:00:00Z"
				}
			}
		],
		"fileSystems": [
			{
				"identifier": {
					"value": "logs",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"mount": {
					"value": "/mnt/logs",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"totalSpace": {
					"value": "102400",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"type": {
					"value": "NTFS",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"usableSpace": {
					"value": "51200",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"uuid": {
					"value": "135792468",
					"timestamp": "2023-06-22T12:00:00Z"
				}
			},
			{
				"identifier": {
					"value": "config",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"mount": {
					"value": "/mnt/config",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"totalSpace": {
					"value": "81920",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"type": {
					"value": "NTFS",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"usableSpace": {
					"value": "40960",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"uuid": {
					"value": "987654321",
					"timestamp": "2023-06-22T12:00:00Z"
				}
			},
			{
				"identifier": {
					"value": "app",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"mount": {
					"value": "/mnt/app",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"totalSpace": {
					"value": "102400",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"type": {
					"value": "NTFS",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"usableSpace": {
					"value": "51200",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"uuid": {
					"value": "987654320",
					"timestamp": "2023-06-22T12:00:00Z"
				}
			}
		],
		"certificates": []
	},
	"Server Delta": {
		"cpu": {
			"identifier": {
				"value": "AMD Ryzen 7 5800X",
				"timestamp": "2023-06-22T00:00:00Z"
			},
			"currentFrequency": {
				"value": "4200000000",
				"timestamp": "2023-06-22T00:00:00Z"
			},
			"cpuLoad": {
				"value": "85",
				"timestamp": "2023-06-22T00:00:00Z"
			},
			"temperature": {
				"value": "65",
				"timestamp": "2023-06-22T00:00:00Z"
			}
		},
		"ram": {
			"usedMemory": {
				"value": "28000",
				"timestamp": "2023-06-22T00:00:00Z"
			},
			"totalMemory": {
				"value": "65536",
				"timestamp": "2023-06-22T00:00:00Z"
			}
		},
		"applications": {
			"atoCore": {
				"associatedProcesses": [
					{
						"cpuUsage": {
							"value": "25",
							"timestamp": "2023-06-22T00:00:00Z"
						},
						"isExecuting": {
							"value": "true",
							"timestamp": "2023-06-22T00:00:00Z"
						},
						"memoryConsumption": {
							"value": "512345",
							"timestamp": "2023-06-22T00:00:00Z"
						},
						"pid": {
							"value": "5678",
							"timestamp": "2023-06-22T00:00:00Z"
						},
						"processName": {
							"value": "python",
							"timestamp": "2023-06-22T00:00:00Z"
						},
						"upTime": {
							"value": "120000",
							"timestamp": "2023-06-22T00:00:00Z"
						}
					}
				],
				"manufacturer": {
					"value": "Siemens AG",
					"timestamp": "2023-06-22T00:00:00Z"
				},
				"productName": {
					"value": "ATO TS Pro",
					"timestamp": "2023-06-22T00:00:00Z"
				},
				"version": {
					"value": "1.0",
					"timestamp": "2023-06-22T00:00:00Z"
				}
			}
		},
		"connectedOnboards": [
			{
				"atoState": {
					"value": "DISENGAGED",
					"timestamp": "2023-06-22T00:00:00Z"
				},
				"currentSegment": {
					"nidC": {
						"value": "456",
						"timestamp": "2023-06-22T00:00:00Z"
					},
					"nidSp": {
						"value": "789",
						"timestamp": "2023-06-22T00:00:00Z"
					},
					"position": {
						"value": "15",
						"timestamp": "2023-06-22T00:00:00Z"
					}
				},
				"nidEngine": {
					"value": "1234",
					"timestamp": "2023-06-22T00:00:00Z"
				},
				"nidOperational": {
					"value": "5678",
					"timestamp": "2023-06-22T00:00:00Z"
				},
				"previousTimingPoint": {},
				"Q_STR_Indicators": {},
				"runningVersion": {
					"value": "2.0",
					"timestamp": "2023-06-22T00:00:00Z"
				},
				"timingPointEstimations": [
					{
						"name": {
							"value": "TP-XYZ-789",
							"timestamp": "2023-06-22T00:00:00Z"
						},
						"nidC": {
							"value": "456",
							"timestamp": "2023-06-22T00:00:00Z"
						},
						"nidTp": {
							"value": "321",
							"timestamp": "2023-06-22T00:00:00Z"
						},
						"estimatedArrival": {
							"value": "2023-06-22T12:00:00Z",
							"timestamp": "2023-06-22T00:00:00Z"
						}
					}
				],
				"trainSpeed": {
					"value": "80",
					"timestamp": "2023-06-22T00:00:00Z"
				}
			}
		],
		"fileSystems": [
			{
				"identifier": {
					"value": "logs",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"mount": {
					"value": "/mnt/logs",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"totalSpace": {
					"value": "65536",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"type": {
					"value": "EXT4",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"usableSpace": {
					"value": "32768",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"uuid": {
					"value": "12345678",
					"timestamp": "2023-06-22T12:00:00Z"
				}
			},
			{
				"identifier": {
					"value": "config",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"mount": {
					"value": "/mnt/config",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"totalSpace": {
					"value": "81920",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"type": {
					"value": "EXT4",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"usableSpace": {
					"value": "40960",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"uuid": {
					"value": "87654321",
					"timestamp": "2023-06-22T12:00:00Z"
				}
			},
			{
				"identifier": {
					"value": "app",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"mount": {
					"value": "/mnt/app",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"totalSpace": {
					"value": "65536",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"type": {
					"value": "EXT4",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"usableSpace": {
					"value": "32768",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"uuid": {
					"value": "87654321",
					"timestamp": "2023-06-22T12:00:00Z"
				}
			}
		],
		"certificates": []
	},
	"Server Epsilon": {
		"cpu": {
			"identifier": {
				"value": "Intel(R) Core(TM) i7-8700K CPU @ 3.70GHz",
				"timestamp": "2023-06-22T00:00:00Z"
			},
			"currentFrequency": {
				"value": "4000000000",
				"timestamp": "2023-06-22T00:00:00Z"
			},
			"cpuLoad": {
				"value": "85",
				"timestamp": "2023-06-22T00:00:00Z"
			},
			"temperature": {
				"value": "65",
				"timestamp": "2023-06-22T00:00:00Z"
			}
		},
		"ram": {
			"usedMemory": {
				"value": "41234",
				"timestamp": "2023-06-22T00:00:00Z"
			},
			"totalMemory": {
				"value": "65536",
				"timestamp": "2023-06-22T00:00:00Z"
			}
		},
		"applications": {
			"atoCore": {
				"associatedProcesses": [
					{
						"cpuUsage": {
							"value": "20",
							"timestamp": "2023-06-22T00:00:00Z"
						},
						"isExecuting": {
							"value": "false",
							"timestamp": "2023-06-22T00:00:00Z"
						},
						"memoryConsumption": {
							"value": "456789",
							"timestamp": "2023-06-22T00:00:00Z"
						},
						"pid": {
							"value": "5678",
							"timestamp": "2023-06-22T00:00:00Z"
						},
						"processName": {
							"value": "python",
							"timestamp": "2023-06-22T00:00:00Z"
						},
						"upTime": {
							"value": "678912",
							"timestamp": "2023-06-22T00:00:00Z"
						}
					}
				],
				"manufacturer": {
					"value": "Siemens AG",
					"timestamp": "2023-06-22T00:00:00Z"
				},
				"productName": {
					"value": "ATO TS Pro",
					"timestamp": "2023-06-22T00:00:00Z"
				},
				"version": {
					"value": "1.0",
					"timestamp": "2023-06-22T00:00:00Z"
				}
			}
		},
		"connectedOnboards": [
			{
				"atoState": {
					"value": "DISENGAGED",
					"timestamp": "2023-06-22T00:00:00Z"
				},
				"currentSegment": {
					"nidC": {
						"value": "456",
						"timestamp": "2023-06-22T00:00:00Z"
					},
					"nidSp": {
						"value": "789",
						"timestamp": "2023-06-22T00:00:00Z"
					},
					"position": {
						"value": "15",
						"timestamp": "2023-06-22T00:00:00Z"
					}
				},
				"nidEngine": {
					"value": "8765",
					"timestamp": "2023-06-22T00:00:00Z"
				},
				"nidOperational": {
					"value": "4321",
					"timestamp": "2023-06-22T00:00:00Z"
				},
				"previousTimingPoint": {},
				"Q_STR_Indicators": {},
				"runningVersion": {
					"value": "2.0",
					"timestamp": "2023-06-22T00:00:00Z"
				},
				"timingPointEstimations": [
					{
						"name": {
							"value": "TP-XYZ-789",
							"timestamp": "2023-06-22T00:00:00Z"
						},
						"nidC": {
							"value": "456",
							"timestamp": "2023-06-22T00:00:00Z"
						},
						"nidTp": {
							"value": "123",
							"timestamp": "2023-06-22T00:00:00Z"
						},
						"estimatedArrival": {
							"value": "2023-06-22T12:00:00Z",
							"timestamp": "2023-06-22T00:00:00Z"
						}
					}
				],
				"trainSpeed": {
					"value": "80",
					"timestamp": "2023-06-22T00:00:00Z"
				}
			}
		],
		"fileSystems": [
			{
				"identifier": {
					"value": "logs",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"mount": {
					"value": "/mnt/logs",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"totalSpace": {
					"value": "53248",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"type": {
					"value": "EXT4",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"usableSpace": {
					"value": "20480",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"uuid": {
					"value": "87654321",
					"timestamp": "2023-06-22T12:00:00Z"
				}
			},
			{
				"identifier": {
					"value": "config",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"mount": {
					"value": "/mnt/config",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"totalSpace": {
					"value": "57344",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"type": {
					"value": "EXT4",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"usableSpace": {
					"value": "24576",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"uuid": {
					"value": "76543210",
					"timestamp": "2023-06-22T12:00:00Z"
				}
			},
			{
				"identifier": {
					"value": "app",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"mount": {
					"value": "/mnt/app",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"totalSpace": {
					"value": "45056",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"type": {
					"value": "EXT4",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"usableSpace": {
					"value": "16384",
					"timestamp": "2023-06-22T12:00:00Z"
				},
				"uuid": {
					"value": "13579086",
					"timestamp": "2023-06-22T12:00:00Z"
				}
			}
		],
		"certificates": []
	}
}`;

    this._sourceDataMap = JSON.parse(jsonData);

    this._subscription = interval(environment.pollingIntervalInSeconds * 1000).subscribe({
      // NOTE: Don't change this. Using () => {} is important to maintain the context of `this`
      next: () => {
        this.publishNewData();
      },
    });
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  public get sourceDataMap(): { [key: string]: AtoSystemDto } {
    return this._sourceDataMap;
  }

  private publishNewData() {
    const timestamp = new Date();

    this.generateNewAtoSystemsData(timestamp);

    this._dataSubject.next(this.sourceDataMap);

    // onboards historical data
    this.generateOnboardsHistoricalData();
  }

  public generateAtoTrackAreas(): Array<AtoTrackAreaDto> {
    const areas: Array<AtoTrackAreaDto> = [
      {
        areaName: { value: 'Area 1', timestamp: new Date() },
        checksum: { value: 'e4d909c290d0fb1ca068ffaddf22cbd0', timestamp: new Date() },
        lastUpdate: { value: '2023-07-15T12:30:45.000Z', timestamp: new Date() },
        projectName: { value: 'Project 1', timestamp: new Date() },
      },
      {
        areaName: { value: 'Area 2', timestamp: new Date() },
        checksum: { value: '7b4e9c8e8c14b2711fa28db43d9dbef1', timestamp: new Date() },
        lastUpdate: { value: '2023-07-16T09:15:20.000Z', timestamp: new Date() },
        projectName: { value: 'Project 2', timestamp: new Date() },
      },
      {
        areaName: { value: 'Area 3', timestamp: new Date() },
        checksum: { value: '15d0cb6fb5c4240baeb8d2100a927beb', timestamp: new Date() },
        lastUpdate: { value: '2023-07-17T15:45:10.000Z', timestamp: new Date() },
        projectName: { value: 'Project 3', timestamp: new Date() },
      },
      {
        areaName: { value: 'Area 4', timestamp: new Date() },
        checksum: { value: 'c7b1ee0addd3932b51e5ce42c801e06b', timestamp: new Date() },
        lastUpdate: { value: '2023-07-18T08:20:30.000Z', timestamp: new Date() },
        projectName: { value: 'Project 4', timestamp: new Date() },
      },
      {
        areaName: { value: 'Area 5', timestamp: new Date() },
        checksum: { value: '3e0af08eb0e992077d6f32ef1f8d31e3', timestamp: new Date() },
        lastUpdate: { value: '2023-07-19T16:10:55.000Z', timestamp: new Date() },
        projectName: { value: 'Project 5', timestamp: new Date() },
      },
    ];

    return areas;
  }

  public generateMockApplicationsDto(): ApplicationsDto {
    // Mock values for BasicApplicationInformationDto
    const mockBasicApplicationInfo: BasicApplicationInformationDto = {
      applicationState: { value: '1', timestamp: new Date() },
      manufacturer: { value: 'Siemens Mobility GmbH', timestamp: new Date() },
      productName: { value: '', timestamp: new Date() },
      version: { value: '1.0.0', timestamp: new Date() },
    };

    // Mock values for ApplicationsDto
    const mockApplicationsDto: ApplicationsDto = {
      atoCore: {
        ...this.generateAtoApplicationDto(),
        productName: { value: 'ATO Core', timestamp: new Date() },
      },
      database: { ...mockBasicApplicationInfo, productName: { value: 'PostgreSQL 13', timestamp: new Date() } },
      onboardAdapter: {
        ...this.generateAtoApplicationDto(),
        productName: { value: 'Onboard Adapter', timestamp: new Date() },
      },
      statusAdapter: {
        ...this.generateAtoApplicationDto(),
        productName: { value: 'Status Adapter', timestamp: new Date() },
      },
      trackDataAdapter: {
        ...this.generateAtoApplicationDto(),
        productName: { value: 'Track Data Adapter', timestamp: new Date() },
      },
      trainPositionAdapter: {
        ...this.generateAtoApplicationDto(),
        productName: { value: 'Train Position Adapter', timestamp: new Date() },
      },
      travelplanAdapter: {
        ...this.generateAtoApplicationDto(),
        productName: { value: 'Travel Plan Adapter', timestamp: new Date() },
      },
    };

    return mockApplicationsDto;
  }

  private generateAtoApplicationDto(): AtoApplicationDto {
    const mockAtoProcessMetrics: AssociatedAtoProcessMetricsDto = this.generateAssociatedAtoProcessMetricsDto();

    return {
      ...mockAtoProcessMetrics,
      associatedProcesses: [mockAtoProcessMetrics],
      applicationState: { value: '1', timestamp: new Date() },
      manufacturer: { value: 'Siemens Mobility GmbH', timestamp: new Date() },
      productName: { value: '', timestamp: new Date() },
      version: { value: '1.0.0', timestamp: new Date() },
    };
  }

  private generateAssociatedAtoProcessMetricsDto(): AssociatedAtoProcessMetricsDto {
    return {
      cpuUsage: { value: this.generateRandomValue(12, 18).toString(), timestamp: new Date() },
      isExecuting: { value: 'true', timestamp: new Date() },
      memoryConsumption: { value: this.generateRandomValue(1024000, 4096000).toString(), timestamp: new Date() },
      pid: { value: this.generateRandomValue(51467, 61542).toString(), timestamp: new Date() },
      processName: { value: 'Process ' + this.generateRandomValue(111, 999).toString(), timestamp: new Date() },
      upTime: { value: new Date().getTime().toString(), timestamp: new Date() },
    };
  }

  private generateRandomValue(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private generateSimulatedCertificates(): CertificateDto[] {
    const certificates: CertificateDto[] = [];

    // Generate 2 valid certificates
    for (let i = 1; i <= 2; i++) {
      const validFrom = new Date();
      const validTo = new Date(validFrom.getTime() + environment.certificates.validDurationInSeconds);

      const certificate: CertificateDto = {
        issuer: { value: `Issuer ${i}`, timestamp: new Date() },
        validFrom: { value: validFrom.toISOString(), timestamp: new Date() },
        validTo: { value: validTo.toISOString(), timestamp: new Date() },
        publicKeyAlgorithm: { value: 'ECC', timestamp: new Date() },
        subject: { value: `Subject ${i}`, timestamp: new Date() },
        signatureAlgorithm: { value: 'SHA384', timestamp: new Date() },
        serialNumber: { value: `${i}`, timestamp: new Date() },
        aliasName: { value: `cert${i}`, timestamp: new Date() },
      };

      certificates.push(certificate);
    }

    // Generate 1 expiring soon certificate
    const expiringSoonValidFrom = new Date();
    const expiringSoonValidTo = new Date(expiringSoonValidFrom.getTime() + environment.certificates.expiresSoonDurationInSeconds);

    const expiringSoonCertificate: CertificateDto = {
      issuer: { value: 'Expiring Soon Issuer', timestamp: new Date() },
      validFrom: {
        value: expiringSoonValidFrom.toISOString(),
        timestamp: new Date(),
      },
      validTo: {
        value: expiringSoonValidTo.toISOString(),
        timestamp: new Date(),
      },
      publicKeyAlgorithm: { value: 'ECC', timestamp: new Date() },
      subject: { value: 'Expiring Soon Subject', timestamp: new Date() },
      signatureAlgorithm: { value: 'SHA384', timestamp: new Date() },
      serialNumber: { value: '3', timestamp: new Date() },
      aliasName: { value: 'cert3', timestamp: new Date() },
    };

    certificates.push(expiringSoonCertificate);

    // Generate 2 expired certificates
    for (let i = 4; i <= 5; i++) {
      const expiredValidFrom = new Date(new Date().getTime() - 2 * environment.certificates.validDurationInSeconds);
      const expiredValidTo = new Date(new Date().getTime() - environment.certificates.validDurationInSeconds);

      const expiredCertificate: CertificateDto = {
        issuer: { value: `Expired Issuer ${i}`, timestamp: new Date() },
        validFrom: {
          value: expiredValidFrom.toISOString(),
          timestamp: new Date(),
        },
        validTo: { value: expiredValidTo.toISOString(), timestamp: new Date() },
        publicKeyAlgorithm: { value: 'ECC', timestamp: new Date() },
        subject: { value: `Expired Subject ${i}`, timestamp: new Date() },
        signatureAlgorithm: { value: 'SHA384', timestamp: new Date() },
        serialNumber: { value: `${i}`, timestamp: new Date() },
        aliasName: { value: `cert${i}`, timestamp: new Date() },
      };

      certificates.push(expiredCertificate);
    }

    return certificates;
  }

  private generateRaidDeviceData(): Array<RaidDeviceDto> {
    const devices: RaidDeviceDto[] = [];

    // Generate data for each device
    const device1: RaidDeviceDto = {
      identifier: this.generateValueDto('md0'),
      personality: this.generateValueDto('raid6'),
      raidDisksCount: this.generateValueDto(6),
      nonDegradedDiskCount: this.generateValueDto(5),
      syncedDisksCount: this.generateValueDto(5),
      isActive: this.generateValueDto(true),
      isReadOnly: this.generateValueDto(false),
      resyncInformation: null,
      bitmapInformation: {
        chunkSize: this.generateValueDto('8192KB'),
        existingPages: this.generateValueDto(5),
        file: this.generateValueDto('/WIBS/<node>:md0/WIB_<node>:md0'),
        pagesSize: this.generateValueDto('20KB'),
        totalPages: this.generateValueDto(113),
      },
      disks: [
        this.generateRaidDiskInformationDto('sdf1', 0, false, true, true, true),
        this.generateRaidDiskInformationDto('sde1', 1, true, true, true, true),
        this.generateRaidDiskInformationDto('sdd1', 2, false, false, false, false),
        this.generateRaidDiskInformationDto('sdc1', 3, false, false, false, false),
        this.generateRaidDiskInformationDto('sdb1', 4, false, true, false, false),
        this.generateRaidDiskInformationDto('sda1', 5, false, false, false, false),
        this.generateRaidDiskInformationDto('hdb1', 6, true, false, true, true),
      ],
    };
    devices.push(device1);

    const device2: RaidDeviceDto = {
      identifier: this.generateValueDto('md127'),
      personality: this.generateValueDto('raid5'),
      raidDisksCount: this.generateValueDto(6),
      nonDegradedDiskCount: this.generateValueDto(5),
      syncedDisksCount: this.generateValueDto(5),
      isActive: this.generateValueDto(true),
      isReadOnly: this.generateValueDto(false),
      resyncInformation: {
        operation: this.generateValueDto('recovery'),
        progress: this.generateValueDto('12.6%'),
        finish: this.generateValueDto('127.5min'),
        speed: this.generateValueDto('33440K/sec'),
      },
      bitmapInformation: null,
      disks: [
        this.generateRaidDiskInformationDto('sdh1', 6, false, false, false, false),
        this.generateRaidDiskInformationDto('sdg1', 4, false, false, false, true),
        this.generateRaidDiskInformationDto('sdf1', 3, false, false, true, true),
        this.generateRaidDiskInformationDto('sde1', 2, false, false, false, false),
        this.generateRaidDiskInformationDto('sdd1', 1, false, true, false, false),
        this.generateRaidDiskInformationDto('sdc1', 0, false, false, false, false),
      ],
    };
    devices.push(device2);

    const device3: RaidDeviceDto = {
      identifier: this.generateValueDto('md1'),
      personality: this.generateValueDto('raid1'),
      raidDisksCount: this.generateValueDto(6),
      nonDegradedDiskCount: this.generateValueDto(4),
      syncedDisksCount: this.generateValueDto(4),
      isActive: this.generateValueDto(true),
      isReadOnly: this.generateValueDto(false),
      resyncInformation: null,
      bitmapInformation: null,
      disks: [
        this.generateRaidDiskInformationDto('sde1', 6, false, true, false, false),
        this.generateRaidDiskInformationDto('sdg1', 1, false, false, false, false),
        this.generateRaidDiskInformationDto('sdb1', 4, false, false, false, false),
        this.generateRaidDiskInformationDto('sdd1', 3, false, false, false, false),
        this.generateRaidDiskInformationDto('sdc1', 2, false, false, false, false),
      ],
    };
    devices.push(device3);

    return devices;
  }

  private generateValueDto<T>(v: T): ValueDto {
    return {
      value: String(v),
      timestamp: new Date(),
    };
  }

  private generateRaidDiskInformationDto(
    identifier: string,
    rollNumber: number,
    isReplacementDisk: boolean,
    isFaulty: boolean,
    isWriteMostly: boolean,
    isSpare: boolean
  ): RaidDiskInformationDto {
    return {
      identifier: this.generateValueDto(identifier),
      rollNumber: this.generateValueDto(rollNumber),
      isReplacementDisk: this.generateValueDto(isReplacementDisk),
      isFaulty: this.generateValueDto(isFaulty),
      isWriteMostly: this.generateValueDto(isWriteMostly),
      isSpare: this.generateValueDto(isSpare),
    };
  }

  private generateConnectedOnboardDtos(): Array<ConnectedOnboardDto> {
    const minElements = 5;
    const maxElements = 10;
    const numElements = Math.floor(Math.random() * (maxElements - minElements + 1)) + minElements;

    const connectedOnboards: Array<ConnectedOnboardDto> = [];

    for (let i = 0; i < numElements; i++) {
      const currentTimestamp = new Date();

      const connectedOnboard: ConnectedOnboardDto = {
        atoState: {
          value: 'ENGAGED',
          timestamp: currentTimestamp,
        },
        currentSegment: {
          nidC: {
            value: '123',
            timestamp: currentTimestamp,
          },
          nidSp: {
            value: '456',
            timestamp: currentTimestamp,
          },
          position: {
            value: '10',
            timestamp: currentTimestamp,
          },
        },
        nidEngine: {
          value: (Math.floor(Math.random() * (99999 - 11111 + 1)) + 11111).toString(),
          timestamp: currentTimestamp,
        },
        nidOperational: {
          value: (Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111).toString(),
          timestamp: currentTimestamp,
        },
        previousTimingPoint: {
          accurateStopping: {
            value: 'ACCURATE',
            timestamp: currentTimestamp,
          },
          nidC: {
            value: '567',
            timestamp: currentTimestamp,
          },
          nidTp: {
            value: '789',
            timestamp: currentTimestamp,
          },
          name: {
            value: 'PREV-TP-XYZ',
            timestamp: currentTimestamp,
          },
          stopPassDepart: {
            value: '2023-05-25T09:00:00Z',
            timestamp: currentTimestamp,
          },
        },
        Q_STR_Data_inconsistency: {
          value: 'false',
          timestamp: currentTimestamp,
        },
        Q_STR_LowAdhesion_reported_by_the_driver: {
          value: 'true',
          timestamp: currentTimestamp,
        },
        Q_STR_Next_Stopping_Point_Skip: {
          value: 'true',
          timestamp: currentTimestamp,
        },
        Q_STR_Operational_conditions_fulfilment: {
          value: 'false',
          timestamp: currentTimestamp,
        },
        Q_STR_Reserve_0: {
          value: 'false',
          timestamp: currentTimestamp,
        },
        Q_STR_Reserve_1: {
          value: 'false',
          timestamp: currentTimestamp,
        },
        Q_STR_Reserve_2: {
          value: 'false',
          timestamp: currentTimestamp,
        },
        Q_STR_RoutingError: {
          value: 'false',
          timestamp: currentTimestamp,
        },
        Q_STR_SlipSlide_indication_detected_by_ext_system: {
          value: 'false',
          timestamp: currentTimestamp,
        },
        Q_STR_Train_is_moving: {
          value: 'true',
          timestamp: currentTimestamp,
        },
        Q_STR_Unable_to_stop_at_next_Stopping_Point: {
          value: 'false',
          timestamp: currentTimestamp,
        },
        runningVersion: {
          major: {
            value: '1',
            timestamp: currentTimestamp,
          },
          minor: {
            value: '6',
            timestamp: currentTimestamp,
          },
        },
        timestamp: {
          value: new Date().toISOString(),
          timestamp: currentTimestamp,
        },
        timingPointEstimations: [
          {
            name: {
              value: `TP-${i}-ABC-123`,
              timestamp: currentTimestamp,
            },
            nidC: {
              value: `NIDC-${i}`,
              timestamp: currentTimestamp,
            },
            nidTp: {
              value: `NIDTP-${i}`,
              timestamp: currentTimestamp,
            },
            estimatedArrival: {
              value: new Date().toISOString(),
              timestamp: currentTimestamp,
            },
          },
        ],
        trainSpeed: {
          value: '65',
          timestamp: currentTimestamp,
        },
      };

      connectedOnboards.push(connectedOnboard);
    }

    return connectedOnboards;
  }

  private generateOnboardsHistoricalData(): void {
    const onboardsHistoricalDataMap: { [key: string]: ValueDto[] } = this.generateHistoricalDataMap();

    this._onboardsHistoricalDataSubject.next(onboardsHistoricalDataMap);
  }

  public generateHistoricalDataMap() {
    const onboardsHistoricalDataMap: { [key: string]: ValueDto[] } = {};

    for (const serverName of ['Server Alpha', 'Server Beta', 'Server Gamma', 'Server Delta', 'Server Epsilon']) {
      const valueDtos = new Array();
      let t = new Date();
      t.setHours(t.getHours() - 24);
      for (let i = 0; i < 10; i++) {
        const value = Math.floor(Math.random() * 10).toString();
        const timestamp = t.toISOString();
        valueDtos.push({ value, timestamp });
        t.setHours(t.getHours() + 2);
      }

      onboardsHistoricalDataMap[serverName] = valueDtos;
    }
    return onboardsHistoricalDataMap;
  }

  public generateCpuData(identifier: string, timestamp: Date): CpuDto {
    return {
      identifier: {
        value: identifier,
        timestamp: timestamp,
      },
      cpuLoad: {
        value: this.generateRandomValue(20, 50).toString(),
        timestamp: timestamp,
      },
      currentFrequency: {
        value: this.generateRandomValue(1560000000, 1890000000).toString(),
        timestamp: timestamp,
      },
      temperature: {
        value: this.generateRandomValue(30, 46).toString(),
        timestamp: timestamp,
      },
    } as CpuDto;
  }

  public generateFileSystemDto(identifier: string, timestamp: Date): FileSystemDto {
    const totalSpace = 48640;
    const minPercentage = 20;
    const maxPercentage = 40;

    const randomPercentage = Math.random() * (maxPercentage - minPercentage) + minPercentage;
    const usableSpace = Math.floor((randomPercentage / 100) * totalSpace);

    return {
      identifier: {
        value: identifier,
        timestamp: timestamp,
      },
      mount: {
        value: '/mnt/' + identifier,
        timestamp: timestamp,
      },
      totalSpace: {
        value: totalSpace.toString(),
        timestamp: timestamp,
      },
      type: {
        value: 'EXT4',
        timestamp: timestamp,
      },
      usableSpace: {
        value: usableSpace.toString(),
        timestamp: timestamp,
      },
      uuid: {
        value: '98765432',
        timestamp: timestamp,
      },
    };
  }

  public generateNewAtoSystemsData(timestamp: Date): { [key: string]: AtoSystemDto } {
    const newDataMap = this.sourceDataMap;

    Object.entries(newDataMap).forEach((entry, index) => {
      let atoSystem = entry[1];

      // CPU
      atoSystem.cpu = this.generateCpuData(atoSystem.cpu.identifier.value, timestamp);

      // RAM
      atoSystem.ram.usedMemory.value = this.generateRandomValue(22000, 54000).toString();
      atoSystem.ram.usedMemory.timestamp = timestamp;

      // File Systems
      if (atoSystem.fileSystems && atoSystem.fileSystems.length > 0) {
        atoSystem.fileSystems.forEach((fileSystem) => {
          const totalSpace = parseInt(fileSystem.totalSpace.value, 10);
          const usableSpace = Math.floor(Math.random() * (totalSpace * 0.5 - totalSpace * 0.4 + 1) + totalSpace * 0.4);

          fileSystem.usableSpace.timestamp = timestamp;
          fileSystem.usableSpace.value = usableSpace.toString();
        });
      }

      // Applications
      atoSystem.applications = this.generateMockApplicationsDto();

      // Track Areas
      atoSystem.trackAreas = this.generateAtoTrackAreas();

      // Certificates
      atoSystem.certificates = this.generateSimulatedCertificates();

      // RAID Devices
      atoSystem.raidDevices = this.generateRaidDeviceData();

      // Connected Onboards
      atoSystem.connectedOnboards = this.generateConnectedOnboardDtos();
    });

    return newDataMap;
  }

  public generateVersionsDataContainerType(timestamp: Date): Map<string, VersionsDataContainerType> {
    const versionsDataMap: Map<string, VersionsDataContainerType> = new Map();

    Object.keys(this.sourceDataMap).forEach((key) => {
      let versionsData = {
        applications: new Array(),
        trackAreas: new Array(),
      } as VersionsDataContainerType;

      const mockApplicationsDto = this.generateMockApplicationsDto();

      // Applications
      versionsData.applications.push(mockApplicationsDto.atoCore);
      versionsData.applications.push(mockApplicationsDto.database);
      versionsData.applications.push(mockApplicationsDto.onboardAdapter);
      versionsData.applications.push(mockApplicationsDto.statusAdapter);
      versionsData.applications.push(mockApplicationsDto.trackDataAdapter);
      versionsData.applications.push(mockApplicationsDto.trainPositionAdapter);
      versionsData.applications.push(mockApplicationsDto.travelplanAdapter);

      // Track Areas
      versionsData.trackAreas = this.generateAtoTrackAreas();

      versionsDataMap.set(key, versionsData);
    });

    return versionsDataMap;
  }

  public generateRaidDataMap(): Map<string, Array<RaidDeviceDto>> {
    const raidDataMap: Map<string, Array<RaidDeviceDto>> = new Map();

    Object.keys(this.sourceDataMap).forEach((key) => {
      raidDataMap.set(key, this.generateRaidDeviceData());
    });

    return raidDataMap;
  }

  public generateConnectedOnboardsDtoMap(): Map<string, ConnectedOnboardDto[]> {
    const connectedOnboardDtoMap: Map<string, ConnectedOnboardDto[]> = new Map();

    Object.keys(this.sourceDataMap).forEach((key) => {
      connectedOnboardDtoMap.set(key, this.generateConnectedOnboardDtos());
    });

    return connectedOnboardDtoMap;
  }

  public generateCertificateDtoMap(): Map<string, CertificateDto[]> {
    const certificateDtoMap: Map<string, CertificateDto[]> = new Map();

    Object.keys(this.sourceDataMap).forEach((key) => {
      certificateDtoMap.set(key, this.generateSimulatedCertificates());
    });

    return certificateDtoMap;
  }

  public generateFileSystemsDataMap(): Map<string, Array<FileSystemDto>> {
    const fileSystemsDataMap = new Map<string, Array<FileSystemDto>>();
    const timestamp = new Date();

    Object.entries(this.sourceDataMap).forEach((entry, index) => {
      let serverName = entry[0];
      let atoSystem = entry[1];

      if (atoSystem.fileSystems && atoSystem.fileSystems.length > 0) {
        atoSystem.fileSystems.forEach((fileSystem) => {
          const totalSpace = parseInt(fileSystem.totalSpace.value, 10);
          const usableSpace = Math.floor(Math.random() * (totalSpace * 0.5 - totalSpace * 0.4 + 1) + totalSpace * 0.4);

          fileSystem.usableSpace.timestamp = timestamp;
          fileSystem.usableSpace.value = usableSpace.toString();
        });

        fileSystemsDataMap.set(serverName, atoSystem.fileSystems);
      }
    });

    return fileSystemsDataMap;
  }
}
