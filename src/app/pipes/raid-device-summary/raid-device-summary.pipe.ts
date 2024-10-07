import { Pipe, PipeTransform } from '@angular/core';
import { RaidDeviceDto, RaidDeviceSummaryType, summarizeRaidDevice } from 'src/app/core';

@Pipe({
  name: 'raidDeviceSummary',
})
export class RaidDeviceSummaryPipe implements PipeTransform {
  transform(device: RaidDeviceDto): string {
    return summarizeRaidDevice(device).summary;
  }
}
