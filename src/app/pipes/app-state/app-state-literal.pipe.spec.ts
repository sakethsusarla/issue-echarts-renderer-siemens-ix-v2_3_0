import { TestBed } from '@angular/core/testing';
import { AppStateLiteralPipe } from './app-state-literal.pipe';

describe('AppStateLiteralPipe', () => {
  let pipe: AppStateLiteralPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppStateLiteralPipe]
    });

    pipe = TestBed.inject(AppStateLiteralPipe);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform UNDEFINED(0) to Undefined', () => {
    let result = pipe.transform("0");
    expect(result).toBe('Undefined');

    result = pipe.transform(0 as unknown as string);
    expect(result).toBe('Undefined');
  });

  it('should transform NORMAL(1) to Normal', () => {
    let result = pipe.transform("1");
    expect(result).toBe('Normal');

    result = pipe.transform(1 as unknown as string);
    expect(result).toBe('Normal');
  });

  it('should transform FAILURE(2) to Failure', () => {
    let result = pipe.transform("2");
    expect(result).toBe('Failure');

    result = pipe.transform(2 as unknown as string);
    expect(result).toBe('Failure');
  });

  it('should transform OUT_OF_SPECIFICATION(3) to Out of Specification', () => {
    let result = pipe.transform("3");
    expect(result).toBe('Out of Specification');

    result = pipe.transform(3 as unknown as string);
    expect(result).toBe('Out of Specification');
  });

  it('should transform MAINTENANCE_REQUIRED(4) to Maintenance Required', () => {
    let result = pipe.transform("4");
    expect(result).toBe('Maintenance Required');

    result = pipe.transform(4 as unknown as string);
    expect(result).toBe('Maintenance Required');
  });

  it('should transform FUNCTION_CHECK(5) to Function Check', () => {
    let result = pipe.transform("5");
    expect(result).toBe('Function Check');

    result = pipe.transform(5 as unknown as string);
    expect(result).toBe('Function Check');
  });

  it('should transform IN_TRANSITION(6) to In Transition', () => {
    let result = pipe.transform("6");
    expect(result).toBe('In Transition');

    result = pipe.transform(6 as unknown as string);
    expect(result).toBe('In Transition');
  });

  it('should transform SECURITY_ALERT(7) to Security Alert', () => {
    let result = pipe.transform("7");
    expect(result).toBe('Security Alert');

    result = pipe.transform(7 as unknown as string);
    expect(result).toBe('Security Alert');
  });

  it('should transform random value to Undefined', () => {
    let result = pipe.transform("125");
    expect(result).toBe('Undefined');

    result = pipe.transform(445815 as unknown as string);
    expect(result).toBe('Undefined');
  });
});