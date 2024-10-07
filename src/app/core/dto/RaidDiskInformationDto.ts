import { ValueDto } from './ValueDto';

export interface RaidDiskInformationDto {
  identifier: ValueDto;
  isFaulty: ValueDto;
  isReplacementDisk: ValueDto;
  isSpare: ValueDto;
  isWriteMostly: ValueDto;
  rollNumber: ValueDto;
}
