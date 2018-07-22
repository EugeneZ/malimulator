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
}

export type Flow = (primaryActor: Actor)=>JobInfo;

export type JobInfo = {
  flow: Flow,
  
}

export type Job = {
  filename: string,
  title: string,
  description?: string,
}

export type GameState = {
  +jobs: $ReadOnlyArray<JobInfo>,
  +messages: $ReadOnlyArray<string>,
}