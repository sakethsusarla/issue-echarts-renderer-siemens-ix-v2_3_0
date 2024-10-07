import { BasicApplicationInformationDto } from './BasicApplicationInformationDto';
import { AtoApplicationDto } from './AtoApplicationDto';

export interface ApplicationsDto {
  atoCore: AtoApplicationDto;
  database: BasicApplicationInformationDto;
  onboardAdapter: AtoApplicationDto;
  statusAdapter: AtoApplicationDto;
  trackDataAdapter: AtoApplicationDto;
  trainPositionAdapter: AtoApplicationDto;
  travelplanAdapter: AtoApplicationDto;
}
