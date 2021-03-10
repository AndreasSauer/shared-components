import { Injectable, Type } from '@angular/core';

export type NumberArray = (number | '-' | '+' | ' ')[];

@Injectable()
export class CounterService {
  public createNumberArray(value: number): NumberArray {
    const numberArray = value.toString().split('');
    return numberArray.map((num) => (num === '-' ? num : parseInt(num)));
  }

  public createNumberConfig(
    newNumbers: NumberArray,
    oldNumbers: NumberArray
  ): string[][] {
    const result = [];
    while (newNumbers.length > oldNumbers.length) {
      oldNumbers.unshift(' ');
    }
    while (oldNumbers.length > newNumbers.length) {
      newNumbers.unshift(' ');
    }
    for (let index = 0; index < newNumbers.length; index++) {
      const currentNumber = newNumbers[index];
      const oldNumber = oldNumbers[index] == null ? ' ' : oldNumbers[index];
      if (typeof currentNumber === 'number' && typeof oldNumber === 'number') {
        result[index] = this.calcDeltaBetweenNumbers(oldNumber, currentNumber);
      } else {
        result[index] = this.createDeltaSign(
          String(oldNumber),
          String(currentNumber)
        );
      }
    }
    return result;
  }

  private createDeltaSign(old: string, newVal: string): string[] {
    return old === newVal ? [old] : [old, newVal];
  }

  private calcDeltaBetweenNumbers(old: number, newVal: number): string[] {
    let result = [String(old)];
    let notFound = true;
    if (old === newVal) {
      return result;
    }
    let calcNum = old;
    while (notFound) {
      calcNum++;
      if (calcNum > 9) {
        calcNum = 0;
      }
      result.push(String(calcNum));
      if (calcNum === newVal) {
        notFound = false;
      }
    }
    return result;
  }
}
