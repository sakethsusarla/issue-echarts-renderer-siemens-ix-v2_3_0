import { TestBed } from '@angular/core/testing';
import { HZ_TO_GHZ_DIVISOR } from 'src/app/core';
import { HzToGHzPipe } from './hz-to-ghz.pipe';

describe('HzToGHzPipe', () => {
  let pipe: HzToGHzPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HzToGHzPipe],
    });

    pipe = TestBed.inject(HzToGHzPipe);
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

  it('should transform hz to ghz', () => {
    let hzValue = 5000000000;

    let ghzValue = hzValue / HZ_TO_GHZ_DIVISOR;

    const result = pipe.transform(hzValue);
    expect(result).toBe(ghzValue.toFixed(2));
  });

  it('should transform hz(string) to ghz', () => {
    let hzValue = '5000000000';

    let ghzValue = parseInt(hzValue) / HZ_TO_GHZ_DIVISOR;

    const result = pipe.transform(hzValue);
    expect(result).toBe(ghzValue.toFixed(2));
  });
});
