import { AtoTrackAreaDto } from '../dto/AtoTrackAreaDto';
import { BasicApplicationInformationDto } from '../dto/BasicApplicationInformationDto';

export interface VersionsDataContainerType {
  applications: Array<BasicApplicationInformationDto>;
  trackAreas: Array<AtoTrackAreaDto>;
}
