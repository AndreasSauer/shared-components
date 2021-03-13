import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { CounterService } from './counter.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ans-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [CounterService],
})
export class CounterComponent implements OnChanges {
  @Input() public number: number;

  public runAnimation = false;
  public numberConfig: string[][] = [];

  private old = this.counterService.createNumberArray(0);

  constructor(
    private counterService: CounterService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnChanges(): void {
    if (this.number == null || Number.isNaN(this.number)) {
      return;
    }
    this.runAnimation = false;
    this.animateNumber(this.number);
  }

  private animateNumber(diff: number): void {
    const numberArray = this.counterService.createNumberArray(diff);
    this.numberConfig = this.counterService.createNumberConfig(
      numberArray,
      this.old
    );
    this.old = numberArray;
    setTimeout(() => {
      this.runAnimation = true;
      this.changeDetectorRef.detectChanges();
    }, 0);
  }
}
