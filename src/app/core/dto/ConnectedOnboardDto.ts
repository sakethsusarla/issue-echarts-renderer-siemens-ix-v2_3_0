import { CurrentSegmentDto } from './CurrentSegmentDto';
import { PreviousTimingPointDto } from './PreviousTimingPointDto';
import { RunningVersionDto } from './RunningVersionDto';
import { TimingPointEstimationDto } from './TimingPointEstimationDto';
import { ValueDto } from './ValueDto';

export interface ConnectedOnboardDto {
  atoState: ValueDto;
  currentSegment: CurrentSegmentDto;
  nidEngine: ValueDto;
  nidOperational: ValueDto;
  previousTimingPoint: PreviousTimingPointDto;
  Q_STR_Data_inconsistency: ValueDto;
  Q_STR_LowAdhesion_reported_by_the_driver: ValueDto;
  Q_STR_Next_Stopping_Point_Skip: ValueDto;
  Q_STR_Operational_conditions_fulfilment: ValueDto;
  Q_STR_Reserve_0: ValueDto;
  Q_STR_Reserve_1: ValueDto;
  Q_STR_Reserve_2: ValueDto;
  Q_STR_RoutingError: ValueDto;
  Q_STR_SlipSlide_indication_detected_by_ext_system: ValueDto;
  Q_STR_Train_is_moving: ValueDto;
  Q_STR_Unable_to_stop_at_next_Stopping_Point: ValueDto;
  runningVersion: RunningVersionDto;
  timestamp: ValueDto;
  timingPointEstimations: Array<TimingPointEstimationDto>;
  trainSpeed: ValueDto;
}
