import { match } from 'minimatch';
import { message } from '../effects';
import { FlowGenerator, GameState } from '../types';

export const program = 'list';
export const aliases = ['ls'];

export function* run({
  getState,
  args = [],
}: {
  getState: () => GameState;
  args: ReadonlyArray<string>;
}): FlowGenerator {
  const matchOn = args[0] || '*';
  for (const someProgram of match(getState().programs, matchOn)) {
    yield message(someProgram);
  }
}
