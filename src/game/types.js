// @flow
import Actor from './Actor';

export type Attributes = {
  memory: number,
  experience: number,
  enterprise: number,
  charisma: number,
  affinity: number,
  whitehat: number,
  blackhat: number,
};

/* eslint-disable-next-line no-use-before-define */
export type Flow = (primaryActor: Actor) => JobInfo;

export type JobInfo = {
  flow: Flow,
};

export type Effect = {
  +type: string,
  +data: mixed,
};

export type FlowGenerator = Generator<Effect, void, mixed>;

export type Job = {
  filename: string,
  title: string,
  flow: () => FlowGenerator,
  description?: string,
};

export type GameState = {
  +jobs: $ReadOnlyArray<JobInfo>,
  +messages: $ReadOnlyArray<string>,
};
