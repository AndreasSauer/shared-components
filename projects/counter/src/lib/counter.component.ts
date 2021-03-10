import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'lib-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnChanges {
  @Input() number: number;
  public diff: number = 0;
  public old = this.createNumberArray(0);
  public runAnimation = false;

  public numberConfig: string[][] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.changeNumber();
  }

  public getAnimation(numbers: number[]): string {
    if (!this.runAnimation) {
      return 'unset';
    }
    const dist = numbers?.length - 1;
    return `translateY(-${dist * 100}%)`;
  }

  private changeNumber() {
    this.numberConfig = [];
    this.runAnimation = false;
    setTimeout(() => {
      this.animateNumber(this.number);
      this.cdr.detectChanges();
    }, 0);
  }

  private animateNumber(diff: number) {
    const numberArray = this.createNumberArray(diff);
    this.createNumberConfig(numberArray);
    setTimeout(() => {
      this.runAnimation = true;
      this.cdr.detectChanges();
    }, 1000);
    this.old = numberArray;
  }

  private createNumberConfig(numbers: (number | '-' | '+' | ' ')[]) {
    while (numbers.length > this.old.length) {
      this.old.unshift(' ');
    }
    while (this.old.length > numbers.length) {
      numbers.unshift(' ');
    }
    for (let index = 0; index < numbers.length; index++) {
      const currentNumber = numbers[index];
      const oldNumber = this.old[index] == null ? ' ' : this.old[index];
      if (typeof currentNumber === 'number' && typeof oldNumber === 'number') {
        this.numberConfig[index] = this.calcDeltaBetweenNumbers(
          oldNumber,
          currentNumber
        );
      } else {
        this.numberConfig[index] = this.createDeltaSign(
          String(oldNumber),
          String(currentNumber)
        );
      }
    }
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

  private createNumberArray(value: number): (number | '-' | '+' | ' ')[] {
    let isNegativ = false;
    const numberArray = value.toString().split('');
    if (numberArray[0] === '-') {
      isNegativ = true;
      numberArray.shift();
    }
    if (isNegativ) {
      numberArray.unshift('-');
    }
    return numberArray.map((num) =>
      num === '-' || num === '+' ? num : parseInt(num)
    );
  }
}
