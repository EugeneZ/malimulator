import yieldJobChoices from '../util/yieldJobChoices';

const MobilePhoneChoices = [
  {
    choice: '...build a weather app',
    flow: function*(game) {
      yield game.flow.postJob('weather-simple');
    }
  },
  {
    choice: '...make easy money using ad referals',
    flow: function*(game) {
      yield game.flow.postJob('adware-simple');
    }
  },
]

const OldComputerChoices = [
  {
    choice: '...learn how to get it up and running',
    flow: function*(game) {
      yield game.flow.postJob('commodore-intro');
    }
  }
]

const StarterChoices = [
  {
    choice: '...a mobile phone',
    flow: function*(game) {
      yield game.flow.message(
        'You use it every day. But today is different. Curiosity drives you to...'
      );
      yield* yieldJobChoices(game, MobilePhoneChoices);
    }
  },
  {
    choice: '...a dusty computer',
    flow: function*(game) {
      yield game.flow.message(
        `You found it in your uncle's attic. Curiosity drives you to...`
      );
      yield* yieldJobChoices(game, OldComputerChoices);
    }
  }
];

export const filename = 'intro';

export const title = 'An Auspicious Dawn';

export function* flow(game, actor) {
  const { flow: { message }} = game;
  yield message('You sleep. You eat. You drink. You wake.');
  yield message(
    'Today is different. You taste fascination and curiosity as you pick up...'
  );
  yield* yieldJobChoices(game, StarterChoices);
}
