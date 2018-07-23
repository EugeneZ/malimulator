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

export type RunFlowAction = { +type: 'flow/run', +data: Job };
export const runFlow: Job => RunFlowAction = job => ({
  type: 'flow/run',
  data: job,
});

export type ReceivedJobAction = { +type: 'job/received', +data: Job };
export const receivedJob: Job => ReceivedJobAction = job => ({
  type: 'job/received',
  data: job,
});

export type ReceivedMessageAction = {
  +type: 'message/received',
  +data: string,
};
export const receivedMessage: string => ReceivedMessageAction = message => ({
  type: 'message/received',
  data: message,
});

export type ReceivedChoicesAction = {
  +type: 'choices/received',
  +data: $ReadOnlyArray<string>,
};
export const receivedChoices: (
  $ReadOnlyArray<string>,
) => ReceivedChoicesAction = choices => ({
  type: 'choices/received',
  data: choices,
});

export type InputEnteredAction = {
  +type: 'input/entered',
  +data: string,
};
export const inputEntered: string => InputEnteredAction = input => ({
  type: 'input/entered',
  data: input,
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
  | InputEnteredAction;
