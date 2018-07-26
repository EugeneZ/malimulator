import { ActionType } from 'typesafe-actions';
import * as Effects from './effects';

export type Attributes = {
  memory: number,
  experience: number,
  enterprise: number,
  charisma: number,
  affinity: number,
  whitehat: number,
  blackhat: number,
};

export type FlowGenerator = IterableIterator<ActionType<typeof Effects>>;

export interface Job {
  filename: string,
  title: string,
  description?: string,
};

export type JobWithFlow = Job & {
  flow: (any) => FlowGenerator,
};

export interface Message {
  readonly jobId: number,
  readonly job: Job,
  readonly message: string,
  readonly choices?: ReadonlyArray<string>,
}

export type MessagesState = ReadonlyArray<Message>;

export type Code = { readonly jobId: number, readonly done: boolean };

export interface GameState {
  readonly jobs: ReadonlyArray<Job>,
  readonly messages: MessagesState,
  readonly skills: ReadonlyArray<string>,
  readonly code: ReadonlyArray<Code>,
};
