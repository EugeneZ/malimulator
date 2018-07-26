import yieldJobChoices from '../util/yieldJobChoices';
import { message, postJob } from '../effects';
import { FlowGenerator } from '../types';

const MobilePhoneChoices = [
  {
    choice: '...build a weather app',
    flow: function*() {
      yield postJob('weather-simple');
    },
  },
  {
    choice: '...make easy money using ad referals',
    flow: function*() {
      yield postJob('adware-simple');
    },
  },
];

const OldComputerChoices = [
  {
    choice: '...learn how to get it up and running',
    flow: function*() {
      yield postJob('commodore-intro');
    },
  },
];

const StarterChoices = [
  {
    choice: '...a mobile phone',
    flow: function*() {
      yield message(
        'You use it every day. But today is different. Curiosity drives you to...',
      );
      yield* yieldJobChoices(MobilePhoneChoices);
    },
  },
  {
    choice: '...a dusty computer',
    flow: function*() {
      yield message(
        `You found it in your uncle's attic. Curiosity drives you to...`,
      );
      yield* yieldJobChoices(OldComputerChoices);
    },
  },
];

export const filename = 'intro';

export const title = 'An Auspicious Dawn';

export function* flow(): FlowGenerator {
  yield message('You sleep. You eat. You drink. You wake.');
  yield message(
    'Today is different. You taste fascination and curiosity as you pick up...',
  );
  yield* yieldJobChoices(StarterChoices);
}
