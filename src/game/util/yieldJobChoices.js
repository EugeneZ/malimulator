export default function* yieldJobChoices(game, choicesWithFlow) {
  const result = yield game.flow.choice(choicesWithFlow.map(({ choice })=>choice));
  const { flow } = choicesWithFlow[parseInt(result, 10)];
  yield* flow(game);
}