import { FlowGenerator } from '../types';
import { choice } from '../effects';

export default function* yieldJobChoices(
  choicesWithFlow: ReadonlyArray<{
    choice: string,
    flow: () => FlowGenerator,
  }>,
): FlowGenerator {
  const result = yield choice(choicesWithFlow.map(({ choice: choiceString }) => choiceString));
  const { flow } = choicesWithFlow[parseInt(result, 10)];
  yield* flow();
}
