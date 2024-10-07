import { ValueDto } from './ValueDto';

export interface FileSystemDto {
  identifier: ValueDto;
  mount: ValueDto;
  totalSpace: ValueDto;
  type: ValueDto;
  usableSpace: ValueDto;
  uuid: ValueDto;
}
