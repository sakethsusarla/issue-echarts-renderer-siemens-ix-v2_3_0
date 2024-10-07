import { TestBed } from '@angular/core/testing';
import { NullCheckPipe } from './null-check.pipe';

describe('NullCheckPipe', () => {
  let pipe: NullCheckPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NullCheckPipe]
    });

    pipe = TestBed.inject(NullCheckPipe);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform undefined to "Unknown"', () => {
    const result = pipe.transform(undefined as unknown as string);
    expect(result).toBe('Unknown');
  });

  it('should transform null to "Unknown"', () => {
    const result = pipe.transform(null as unknown as string);
    expect(result).toBe('Unknown');
  });

  it('should transform "(null)" to "Unknown"', () => {
    const result = pipe.transform('(null)');
    expect(result).toBe('Unknown');
  });

  it('should transform "null" to "Unknown"', () => {
    const result = pipe.transform('null');
    expect(result).toBe('Unknown');
  });
});