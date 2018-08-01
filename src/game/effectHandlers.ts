import { Dispatch } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import {
  receivedChoices,
  receivedMessage,
  runFlow,
  recievedCodeTask,
} from './actionCreators';
import * as Actions from './actionCreators';
import * as Effects from './effects';
import { Job, GameState, Actions as ActionsType } from './types';
import { Listener, Listen } from './util/channel';

function checkForSkills(
  getState: () => GameState,
  skills: ReadonlyArray<string>,
) {
  const state = getState().skills;
  for (const skill of skills) {
    if (!state.includes(skill)) {
      return false;
    }
  }

  return true;
}

interface EffectParams<E, T> {
  readonly dispatch: Dispatch;
  readonly effect: E;
  readonly jobId: number;
  readonly job: Job;
  readonly listen: Listen<T>;
  readonly getState: () => GameState;
}

async function message<T>({
  dispatch,
  effect,
  jobId,
  job,
}: EffectParams<ActionType<typeof Effects.message>, T>) {
  if (typeof effect.payload !== 'string') {
    throw new Error('Message effect data must be a string');
  }
  dispatch(receivedMessage({ jobId, job, message: `${effect.payload}` }));
}

async function choice({
  dispatch,
  effect,
  jobId,
  job,
  listen,
}: EffectParams<ActionType<typeof Effects.choice>, number | null>) {
  if (!Array.isArray(effect.payload)) {
    throw new Error('Choice effect data must be an array');
  }
  dispatch(receivedChoices({ jobId, job, choices: effect.payload }));
  return listen(action => {
    if (action.type !== getType(Actions.inputEntered)) {
      return;
    }
    const num = parseInt(action.payload, 10);

    if (num > 0 && num <= effect.payload.length) {
      return num - 1;
    }
  });
}

async function postJob({
  dispatch,
  effect,
}: EffectParams<ActionType<typeof Effects.postJob>, void>) {
  import(`./jobs/${effect.payload.filename}`).then(
    job =>
      effect.type === getType(Effects.postJob) &&
      dispatch(runFlow(job, effect.payload.options)),
  );
}

async function gainedSkills({
  effect,
  dispatch,
}: EffectParams<ActionType<typeof Effects.gainedSkills>, boolean>) {
  dispatch(Actions.receivedSkills(effect.payload));
}

async function requireSkills({
  effect,
  getState,
  listen,
}: EffectParams<ActionType<typeof Effects.requireSkills>, boolean>) {
  while (!checkForSkills(getState, effect.payload)) {
    await listen(
      (action: ActionType<typeof Actions>) =>
        action.type === getType(Actions.receivedSkills),
    );
  }
}

async function writeCode({
  jobId,
  listen,
  dispatch,
}: EffectParams<ActionType<typeof Effects.writeCode>, boolean>) {
  dispatch(recievedCodeTask({ jobId }));
  return listen((action: ActionType<typeof Actions>) => {
    if (
      action.type !== getType(Actions.completedCodeTask) ||
      action.payload.jobId !== jobId
    ) {
      return;
    }

    return true;
  });
}

export type ListenerResults = number | boolean | void;

export default function effectHandlers(
  effect: ActionType<typeof Effects>,
  dispatch: Dispatch,
  jobId: number,
  getState: () => GameState,
  listen: Listen<ListenerResults>,
  job: Job,
) {
  if (effect.type === getType(Effects.message)) {
    return message({
      dispatch,
      jobId,
      getState,
      listen,
      job,
      effect,
    });
  }

  if (effect.type === getType(Effects.choice)) {
    return choice({
      dispatch,
      jobId,
      getState,
      listen,
      job,
      effect,
    });
  }

  if (effect.type === getType(Effects.postJob)) {
    return postJob({
      dispatch,
      jobId,
      getState,
      listen,
      job,
      effect,
    });
  }

  if (effect.type === getType(Effects.requireSkills)) {
    return requireSkills({
      dispatch,
      jobId,
      getState,
      listen,
      job,
      effect,
    });
  }

  if (effect.type === getType(Effects.gainedSkills)) {
    return gainedSkills({
      dispatch,
      jobId,
      getState,
      listen,
      job,
      effect,
    });
  }

  if (effect.type === getType(Effects.writeCode)) {
    return writeCode({
      dispatch,
      jobId,
      getState,
      listen,
      job,
      effect,
    });
  }

  throw new Error(`undefined effect ${JSON.stringify(effect)}`);
}
