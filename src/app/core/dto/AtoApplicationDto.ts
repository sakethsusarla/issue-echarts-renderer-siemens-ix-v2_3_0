import { BasicApplicationInformationDto } from './BasicApplicationInformationDto';
import { AssociatedAtoProcessMetricsDto } from './AssociatedAtoProcessMetricsDto';

export interface AtoApplicationDto extends BasicApplicationInformationDto {
  associatedProcesses: Array<AssociatedAtoProcessMetricsDto>;
}
