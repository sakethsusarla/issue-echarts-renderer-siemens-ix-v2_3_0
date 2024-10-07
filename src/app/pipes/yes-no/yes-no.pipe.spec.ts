import { TestBed } from '@angular/core/testing';
import { YesNoPipe } from './yes-no.pipe';

describe('YesNoPipe', () => {
  let pipe: YesNoPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YesNoPipe]
    });

    pipe = TestBed.inject(YesNoPipe);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "true" to "Yes"', () => {
    const result = pipe.transform('true');
    expect(result).toBe('Yes');
  });

  it('should transform "false" to "No"', () => {
    const result = pipe.transform('false');
    expect(result).toBe('No');
  });

  it('should transform other values to "No"', () => {
    const result = pipe.transform('foo');
    expect(result).toBe('No');
  });
});

