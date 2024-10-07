import { ValueDto } from "./ValueDto";

export interface AssociatedAtoProcessMetricsDto {
  cpuUsage: ValueDto;
  isExecuting: ValueDto;
  memoryConsumption: ValueDto;
  pid: ValueDto;
  processName: ValueDto;
  upTime: ValueDto;
}