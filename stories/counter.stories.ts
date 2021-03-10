import { CommonModule } from '@angular/common';
import { number, withKnobs } from '@storybook/addon-knobs';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { CounterTransitionPipe } from 'projects/counter/src/lib/counter-animation-pipe';
import { CounterComponent } from 'projects/counter/src/lib/counter.component';

const stories = storiesOf('counter', module);

stories.addDecorator(withKnobs);

stories.addDecorator(
  moduleMetadata({
    imports: [CommonModule],
    declarations: [CounterComponent, CounterTransitionPipe],
  })
);

stories.add('Counter', () => ({
  template: `<ans-counter [number]="number"></ans-counter>`,
  props: {
    number: number('number', 10),
  },
}));
