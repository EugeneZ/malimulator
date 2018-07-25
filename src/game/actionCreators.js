// @flow strict
import { type Job } from './types';

export type NewGameAction = { +type: 'state/newGame' };
export const newGame: () => NewGameAction = () => ({ type: 'state/newGame' });

export type SaveAction = { +type: 'state/save' };
export const save: () => SaveAction = state => ({ type: 'state/save' });

export type LoadAction = { +type: 'state/load' };
export const load: () => LoadAction = () => ({ type: 'state/load' });

export type ResetAction = { +type: 'state/reset' };
export const reset: () => ResetAction = () => ({ type: 'state/reset' });

export type RunFlowAction = {
  +type: 'flow/run',
  +data: Job,
  +meta: ?{ [string]: mixed },
};
export const runFlow: (Job, ?{ [string]: mixed }) => RunFlowAction = (
  job,
  options,
) => ({
  type: 'flow/run',
  data: job,
  meta: options,
});

export type ReceivedJobAction = { +type: 'job/received', +data: Job };
export const receivedJob: Job => ReceivedJobAction = job => ({
  type: 'job/received',
  data: job,
});

export type ReceivedMessageAction = {
  +type: 'message/received',
  +data: {|
    +jobId: number,
    +job: Job,
    +message: string,
  |},
};
export const receivedMessage: (number, Job, string) => ReceivedMessageAction = (
  jobId,
  job,
  message,
) => ({
  type: 'message/received',
  data: { jobId, job, message },
});

export type ReceivedChoicesAction = {
  +type: 'choices/received',
  +data: {
    +jobId: number,
    +job: Job,
    +choices: $ReadOnlyArray<string>,
  },
};
export const receivedChoices: (
  number,
  Job,
  $ReadOnlyArray<string>,
) => ReceivedChoicesAction = (jobId, job, choices) => ({
  type: 'choices/received',
  data: { jobId, job, choices },
});

export type InputEnteredAction = {
  +type: 'input/entered',
  +data: string,
};
export const inputEntered: string => InputEnteredAction = input => ({
  type: 'input/entered',
  data: input,
});

export type ReceivedSkillsAction = {
  +type: 'skills/received',
  +data: $ReadOnlyArray<string>,
};
export const receivedSkills: (
  $ReadOnlyArray<string>,
) => ReceivedSkillsAction = skills => ({
  type: 'skills/received',
  data: skills,
});

export type CodeTaskReceivedAction = {
  +type: 'code/received',
  +data: {
    jobId: number,
  },
};
export const recievedCodeTask: number => CodeTaskReceivedAction = jobId => ({
  type: 'code/received',
  data: { jobId },
});

export type CodeTaskCompletedAction = {
  +type: 'code/completed',
  +data: {
    jobId: number,
  },
};
export const completedCodeTask: number => CodeTaskCompletedAction = jobId => ({
  type: 'skills/completed',
  data: { jobId },
});

export type Action =
  | NewGameAction
  | SaveAction
  | LoadAction
  | ResetAction
  | RunFlowAction
  | ReceivedJobAction
  | ReceivedMessageAction
  | ReceivedChoicesAction
  | InputEnteredAction
  | ReceivedSkillsAction
  | CodeTaskReceivedAction
  | CodeTaskCompletedAction;
