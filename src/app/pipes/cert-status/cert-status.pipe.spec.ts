import { TestBed } from '@angular/core/testing';
import { CertificateDto } from 'src/app/core';
import { environment } from 'src/environments/environment';
import { CertStatusPipe } from './cert-status.pipe';

describe('CertStatusPipe', () => {
  let pipe: CertStatusPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CertStatusPipe],
    });

    pipe = TestBed.inject(CertStatusPipe);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for empty input', () => {
    const result = pipe.transform('' as unknown as CertificateDto);
    expect(result).toBe('');
  });

  it('should return empty string for null', () => {
    const result = pipe.transform(null as unknown as CertificateDto);
    expect(result).toBe('');
  });

  it('should return empty string for undefined', () => {
    const result = pipe.transform(undefined as unknown as CertificateDto);
    expect(result).toBe('');
  });

  it('should return empty string for null validTo', () => {
    const certificateDto: CertificateDto = {
      validTo: {
        value: null as unknown as string,
      },
    } as CertificateDto;

    const result = pipe.transform(certificateDto);
    expect(result).toBe('');
  });

  it('should return empty string for undefined validTo', () => {
    const certificateDto: CertificateDto = {
      validTo: {
        value: undefined as unknown as string,
      },
    } as CertificateDto;

    const result = pipe.transform(certificateDto);
    expect(result).toBe('');
  });

  it('should return valid status', () => {
    const now = new Date();
    const validToDate = new Date(now.getTime() + environment.certificates.validDurationInSeconds);
    const certificateDto: CertificateDto = {
      validTo: {
        value: new Date(validToDate).toISOString(),
      },
    } as CertificateDto;

    const result = pipe.transform(certificateDto);
    expect(result).toBe('Valid');
  });

  it('should return expired status', () => {
    const now = new Date();
    const expiredDate = new Date(now.getTime() - environment.certificates.validDurationInSeconds);

    const certificateDto: CertificateDto = {
      validTo: {
        value: expiredDate.toISOString(),
      },
    } as CertificateDto;

    const result = pipe.transform(certificateDto);
    expect(result).toBe('Expired');
  });

  it('should return expires soon status', () => {
    const expiresSoonDate = new Date();
    expiresSoonDate.setTime(expiresSoonDate.getTime() + (environment.certificates.expiresSoonDurationInSeconds - 60 * 1000));
    const certificateDto: CertificateDto = {
      validTo: {
        value: expiresSoonDate.toISOString(),
      },
    } as CertificateDto;

    const result = pipe.transform(certificateDto);
    expect(result).toBe('Expires Soon');
  });
});
