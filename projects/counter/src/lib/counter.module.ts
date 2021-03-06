import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CounterTransitionPipe } from './counter-animation-pipe';
import { CounterComponent } from './counter.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CounterComponent, CounterTransitionPipe],
  exports: [CounterComponent],
})
export class CounterModule {}
