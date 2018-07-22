// @flow
export const filename = 'hello-world';
export const title = 'Hello World';
export const description = 'Need to start somewhere.';
export function* flow(game, actor) {
  yield game.flow.message(`Time to figure out how this works...`);
  yield game.flow.choice(actor);
  yield game.flow.time(1);
}
