import { Job } from './types';
import { createStandardAction  } from 'typesafe-actions';

export const newGame = createStandardAction('state/newGame')();
export const save = createStandardAction('state/save')();
export const load = createStandardAction('state/load')();
export const reset = createStandardAction('state/reset')();
export const runFlow = createStandardAction('flow/run')<Job, {[key:string]: any}>()
export const receivedJob = createStandardAction('job/received')<Job>();

interface MessageReceivedParams {
  readonly jobId: number,
  readonly job: Job,
  readonly message: string,
}
export const receivedMessage = createStandardAction('message/received')<MessageReceivedParams>();

interface ReceivedChoicesParams {
  readonly jobId: number,
  readonly job: Job,
  readonly choices: ReadonlyArray<string>,
}
export const receivedChoices = createStandardAction('choices/received')<ReceivedChoicesParams>();

export const inputEntered = createStandardAction('input/entered')<string>()
export const receivedSkills = createStandardAction('skills/received')<ReadonlyArray<string>>()

interface CodeTaskParams {
  readonly jobId: number,
}
export const recievedCodeTask = createStandardAction('code/received')<CodeTaskParams>()
export const completedCodeTask = createStandardAction('code/completed')<CodeTaskParams>()