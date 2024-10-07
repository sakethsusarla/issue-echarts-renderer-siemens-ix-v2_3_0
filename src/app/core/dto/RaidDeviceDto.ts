import { RaidBitmapInformationDto } from './RaidBitmapInformationDto';
import { RaidDiskInformationDto } from './RaidDiskInformationDto';
import { RaidResyncInformationDto } from './RaidResyncInformationDto';
import { ValueDto } from './ValueDto';

export interface RaidDeviceDto {
  bitmapInformation: RaidBitmapInformationDto | null;
  disks: Array<RaidDiskInformationDto>;
  identifier: ValueDto;
  isActive: ValueDto;
  isReadOnly: ValueDto;
  nonDegradedDiskCount: ValueDto;
  personality: ValueDto;
  raidDisksCount: ValueDto;
  resyncInformation: RaidResyncInformationDto | null;
  syncedDisksCount: ValueDto;
}
