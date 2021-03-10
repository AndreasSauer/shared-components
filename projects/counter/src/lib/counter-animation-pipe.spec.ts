import { CounterTransitionPipe } from './counter-animation-pipe';

describe('TitleCasePipe', () => {
  const pipe = new CounterTransitionPipe();

  it('should return unset when annimation shoudnt run', () => {
    expect(pipe.transform(['0', '1'], false)).toBe('unset');
  });

  it('should return caluclated translateY "', () => {
    expect(pipe.transform(['0', '1', '2'], true)).toBe('translateY(-200%)');
  });
});
