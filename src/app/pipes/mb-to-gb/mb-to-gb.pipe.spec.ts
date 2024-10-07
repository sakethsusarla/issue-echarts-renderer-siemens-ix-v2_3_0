import { TestBed } from '@angular/core/testing';
import { MbToGbPipe } from './mb-to-gb.pipe';
import { MEGABYTE_TO_GIGABYTE_DIVISOR } from 'src/app/core';

describe('MbToGbPipe', () => {
  let pipe: MbToGbPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MbToGbPipe]
    });

    pipe = TestBed.inject(MbToGbPipe);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform null to empty string', () => {
    const result = pipe.transform(null as unknown as string);
    expect(result).toBe('');
  });

  it('should transform undefined to empty string', () => {
    const result = pipe.transform(undefined as unknown as string);
    expect(result).toBe('');
  });

  it('should transform NaN to empty string', () => {
    const result = pipe.transform('abc' as unknown as string);
    expect(result).toBe('');
  });

  it('should transform mb to gb', () => {
    const mbValue = 1044;
    const gbValue = mbValue / MEGABYTE_TO_GIGABYTE_DIVISOR;

    const result = pipe.transform(mbValue);
    expect(result).toBe(gbValue.toFixed(2));
  });

  it('should transform mb(string) to gb', () => {
    const mbValue = "1044";

    const gbValue = parseInt(mbValue) / MEGABYTE_TO_GIGABYTE_DIVISOR;

    const result = pipe.transform(mbValue);
    expect(result).toBe(gbValue.toFixed(2));
  });
});