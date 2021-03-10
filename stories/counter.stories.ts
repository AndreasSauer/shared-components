import { CommonModule } from '@angular/common';
import { number, withKnobs } from '@storybook/addon-knobs';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { CounterComponent } from 'projects/counter/src/lib/counter.component';

const stories = storiesOf('counter', module);

stories.addDecorator(withKnobs);

stories.addDecorator(
  moduleMetadata({
    imports: [CommonModule],
    declarations: [CounterComponent],
  })
);

stories.add('Counter', () => ({
  template: `<lib-counter [number]="number"></lib-counter>`,
  props: {
    number: number('number', 10),
  },
}));
