import { ValueDto } from './ValueDto';

export interface CertificateDto {
  issuer: ValueDto;
  validFrom: ValueDto;
  validTo: ValueDto;
  publicKeyAlgorithm: ValueDto;
  subject: ValueDto;
  signatureAlgorithm: ValueDto;
  serialNumber: ValueDto;
  aliasName: ValueDto;
}
