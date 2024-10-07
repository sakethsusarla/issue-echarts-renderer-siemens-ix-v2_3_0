import { Pipe, PipeTransform } from '@angular/core';
import {
  CertificateDto,
  EXPIRED_LITERAL,
  EXPIRES_SOON_LITERAL,
  VALID_LITERAL,
} from 'src/app/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'certStatus',
})
export class CertStatusPipe implements PipeTransform {
  transform(certificate: CertificateDto): string {

    if (certificate && certificate.validTo && Date.parse(certificate.validTo.value)) {
      const currentTime = new Date();
      const validToDate = new Date(certificate.validTo.value);

      if (validToDate < currentTime) {
        return EXPIRED_LITERAL;
      }

      const expiresSoonDuration =
        environment.certificates.expiresSoonDurationInSeconds;
      const expiresSoonTime = new Date(
        currentTime.getTime() + expiresSoonDuration
      );

      if (validToDate < expiresSoonTime) {
        return EXPIRES_SOON_LITERAL;
      }

      return VALID_LITERAL;
    }

    return '';
  }
}
