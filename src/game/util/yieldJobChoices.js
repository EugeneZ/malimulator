// @flow strict
import { type FlowGenerator } from '../types';
import { choice } from '../effects';

export default function* yieldJobChoices(
  choicesWithFlow: $ReadOnlyArray<{
    choice: string,
    flow: () => FlowGenerator,
  }>,
): FlowGenerator {
  const result = yield choice(choicesWithFlow.map(({ choice }) => choice));
  const { flow } = choicesWithFlow[parseInt(result, 10)];
  yield* flow();
}
