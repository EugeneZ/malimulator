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
  readonly listen: Listen<T>;
  readonly getState: () => GameState;
}

async function message<T>({
  dispatch,
  effect,
}: EffectParams<ActionType<typeof Effects.message>, T>) {
  if (typeof effect.payload !== 'string') {
    throw new Error('Message effect data must be a string');
  }
  dispatch(receivedMessage({ message: `${effect.payload}` }));
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

export type ListenerResults = number | boolean | void;

export default function effectHandlers(
  effect: ActionType<typeof Effects>,
  dispatch: Dispatch,
  getState: () => GameState,
  listen: Listen<ListenerResults>,
) {
  if (effect.type === getType(Effects.message)) {
    return message({
      dispatch,
      getState,
      listen,
      effect,
    });
  }

  if (effect.type === getType(Effects.postJob)) {
    return postJob({
      dispatch,
      getState,
      listen,
      effect,
    });
  }

  if (effect.type === getType(Effects.requireSkills)) {
    return requireSkills({
      dispatch,
      getState,
      listen,
      effect,
    });
  }

  if (effect.type === getType(Effects.gainedSkills)) {
    return gainedSkills({
      dispatch,
      getState,
      listen,
      effect,
    });
  }

  throw new Error(`undefined effect ${JSON.stringify(effect)}`);
}
