import { ValueDto } from './ValueDto';

export interface CpuDto {
  identifier: ValueDto;
  currentFrequency: ValueDto;
  cpuLoad: ValueDto;
  temperature: ValueDto;
}
