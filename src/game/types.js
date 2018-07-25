// @flow strict
import Actor from './Actor';
import { type Effect } from './effects';

export type Attributes = {
  memory: number,
  experience: number,
  enterprise: number,
  charisma: number,
  affinity: number,
  whitehat: number,
  blackhat: number,
};

export type FlowGenerator = Generator<Effect, void, mixed>;

export type Job = {
  filename: string,
  title: string,
  description?: string,
};

export type JobWithFlow<FA> = Job & {
  flow: FA => FlowGenerator,
};

export type MessagesState = $ReadOnlyArray<{
  +jobId: number,
  +job: Job,
  +message: string,
  +choices?: $ReadOnlyArray<string>,
}>;

export type Code = { +jobId: number, +done: boolean };

export type GameState = {
  +jobs: $ReadOnlyArray<Job>,
  +messages: MessagesState,
  +skills: $ReadOnlyArray<string>,
  +code: $ReadOnlyArray<Code>,
};
