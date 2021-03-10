import { CounterService } from './counter.service';

describe('counter service', () => {
  describe('createNumberArray', () => {
    const service = new CounterService();
    it('should create number array', () => {
      expect(service.createNumberArray(1234)).toEqual([1, 2, 3, 4]);
    });

    it('should add minus sign when number is negativ', () => {
      expect(service.createNumberArray(-1234)).toEqual(['-', 1, 2, 3, 4]);
    });
  });

  describe('createNumberConfig', () => {
    const service = new CounterService();
    it('should create number config between two number arrays', () => {
      const newArray = service.createNumberArray(45);
      const oldArray = service.createNumberArray(11);
      const result = service.createNumberConfig(newArray, oldArray);
      const expectedResult = [
        ['1', '2', '3', '4'],
        ['1', '2', '3', '4', '5'],
      ];
      expect(result).toEqual(expectedResult);
    });

    it('numbers should jump from 9 to 0', () => {
      const newArray = service.createNumberArray(45);
      const oldArray = service.createNumberArray(18);
      const result = service.createNumberConfig(newArray, oldArray);
      const expectedResult = [
        ['1', '2', '3', '4'],
        ['8', '9', '0', '1', '2', '3', '4', '5'],
      ];
      expect(result).toEqual(expectedResult);
    });

    it('numbers should add columns when newArray is longer', () => {
      const newArray = service.createNumberArray(4545);
      const oldArray = service.createNumberArray(11);
      const result = service.createNumberConfig(newArray, oldArray);
      const expectedResult = [
        [' ', '4'],
        [' ', '5'],
        ['1', '2', '3', '4'],
        ['1', '2', '3', '4', '5'],
      ];
      expect(result).toEqual(expectedResult);
    });

    it('numbers should add columsn when newArray is shorter', () => {
      const newArray = service.createNumberArray(45);
      const oldArray = service.createNumberArray(4511);
      const result = service.createNumberConfig(newArray, oldArray);
      const expectedResult = [
        ['4', ' '],
        ['5', ' '],
        ['1', '2', '3', '4'],
        ['1', '2', '3', '4', '5'],
      ];
      expect(result).toEqual(expectedResult);
    });

    it('numbers add signs', () => {
      const newArray = service.createNumberArray(-45);
      const oldArray = service.createNumberArray(11);
      const result = service.createNumberConfig(newArray, oldArray);
      const expectedResult = [
        [' ', '-'],
        ['1', '2', '3', '4'],
        ['1', '2', '3', '4', '5'],
      ];
      expect(result).toEqual(expectedResult);
    });
  });
});
