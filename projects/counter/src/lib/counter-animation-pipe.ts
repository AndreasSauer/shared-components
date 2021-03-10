import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'transition' })
export class CounterTransitionPipe implements PipeTransform {
  transform(numbers: string[], runAnimation: boolean): string {
    if (!runAnimation) {
      return 'unset';
    }
    const dist = numbers?.length - 1;
    return `translateY(-${dist * 100}%)`;
  }
}
