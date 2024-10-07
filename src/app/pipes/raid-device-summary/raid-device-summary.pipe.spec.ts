import { TestBed } from '@angular/core/testing';
import { RaidDeviceDto } from 'src/app/core/dto/RaidDeviceDto';
import { RaidDeviceSummaryPipe } from './raid-device-summary.pipe';

describe('RaidDeviceSummaryPipe', () => {
  let pipe: RaidDeviceSummaryPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaidDeviceSummaryPipe],
    });

    pipe = TestBed.inject(RaidDeviceSummaryPipe);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return `Healthy`', () => {
    const device: RaidDeviceDto = {
      identifier: {
        value: 'Server1',
      },
      nonDegradedDiskCount: {
        value: '2',
      },
      raidDisksCount: {
        value: '2',
      },
    } as RaidDeviceDto;

    const result = pipe.transform(device);

    expect(result).toBe('Healthy');
  });

  it('should return `Resyncing`', () => {
    const device: RaidDeviceDto = {
      identifier: {
        value: 'Server1',
      },
      nonDegradedDiskCount: {
        value: '1',
      },
      raidDisksCount: {
        value: '2',
      },
      resyncInformation: {
        finish: {
          value: '',
        },
        speed: {
          value: '',
        },
        progress: {
          value: '',
        },
        operation: {
          value: 'Some random operation',
        },
      },
    } as RaidDeviceDto;

    const result = pipe.transform(device);

    expect(result).toBe('Resyncing');
  });

  it('should return `Degraded`', () => {
    const device: RaidDeviceDto = {
      identifier: {
        value: 'Server1',
      },
      resyncInformation: null,
      nonDegradedDiskCount: {
        value: '1',
      },
      raidDisksCount: {
        value: '2',
      },
    } as RaidDeviceDto;

    const result = pipe.transform(device);

    expect(result).toBe('Degraded');
  });

  it('should returned `Failed`', () => {
    const device: RaidDeviceDto = {
      identifier: {
        value: 'Server1',
      },
      resyncInformation: null,
      nonDegradedDiskCount: {
        value: '2',
      },
      raidDisksCount: {
        value: undefined as unknown as string,
      },
    } as RaidDeviceDto;

    const result = pipe.transform(device);

    expect(result).toBe('Failed');
  });
});
