import { ApplicationsDto } from './ApplicationsDto';
import { AtoTrackAreaDto } from './AtoTrackAreaDto';
import { CertificateDto } from './CertificateDto';
import { ConnectedOnboardDto } from './ConnectedOnboardDto';
import { CpuDto } from './CpuDto';
import { FileSystemDto } from './FileSystemDto';
import { RaidDeviceDto } from './RaidDeviceDto';
import { RamDto } from './RamDto';

export interface AtoSystemDto {
  cpu: CpuDto;
  ram: RamDto;
  applications: ApplicationsDto;
  trackAreas: Array<AtoTrackAreaDto>;
  connectedOnboards: Array<ConnectedOnboardDto>;
  fileSystems: Array<FileSystemDto>;
  certificates: Array<CertificateDto>;
  raidDevices: Array<RaidDeviceDto>;
}
