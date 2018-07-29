import { Dispatch } from 'redux';
import { ActionType } from 'typesafe-actions';
import {
  receivedChoices,
  receivedMessage,
  runFlow,
  recievedCodeTask,
} from './actionCreators';
import * as Effects from './effects';
import { Job } from './types';

function checkForSkills(getState, skills) {
  const state = getState().skills;
  for (let skill of skills) {
    if (!state.includes(skill)) {
      return false;
    }
  }

  return true;
}

interface EffectParams<E> { dispatch: Dispatch, effect: E, jobId: number, job: Job, listen: any, getState: any };
type EffectHandler<E> = (params: EffectParams<E>)=>any;
interface EffectHandlerMap {
  readonly 'flow/message': EffectHandler<ActionType<typeof Effects.message>>,
  readonly 'flow/choice': EffectHandler<ActionType<typeof Effects.choice>>,
  readonly 'flow/postJob': EffectHandler<ActionType<typeof Effects.postJob>>,
  readonly 'flow/requireSkills': EffectHandler<ActionType<typeof Effects.requireSkills>>,
  readonly 'flow/writeCode': EffectHandler<ActionType<typeof Effects.writeCode>>
}

async function message({ dispatch, effect, jobId, job }) {
  if (typeof effect.payload !== 'string') {
    throw new Error('Message effect data must be a string');
  }
  dispatch(receivedMessage({jobId, job, message: `${effect.payload}`}));
}

async function choice({ dispatch, effect, jobId, job, listen }) {
  if (!Array.isArray(effect.payload)) {
    throw new Error('Choice effect data must be an array');
  }
  dispatch(receivedChoices({jobId, job, choices: effect.payload}));
  return [
    await listen(action => {
      if (action.type !== 'input/entered') {
        return null;
      }
      const num = parseInt(action.payload, 10);

      if (num > 0 && num <= effect.payload.length) {
        return num - 1;
      }

      return null;
    }),
  ];
}

async function postJob({ dispatch, effect }) {
  import(`./jobs/${effect.payload.filename}`).then(
    job =>
    effect.type === 'flow/postJob' && dispatch(runFlow(job, effect.payload.options)),
  );
}

async function requireSkills({ effect, getState, listen }) {
  while (!checkForSkills(getState, effect.payload)) {
    await listen(action => action.type === 'skills/received');
  }
}

async function writeCode({ jobId, listen, dispatch }) {
  dispatch(recievedCodeTask({jobId}));
  await listen(action => {
    if (action.type !== 'code/completed' || action.payload.jobId !== jobId) {
      return null;
    }
  });
}

export default function effectHandlers(effect, dispatch, jobId, getState, listen, job){
  const params = {
    dispatch,
    jobId,
    getState,
    listen,
    job,
    effect
  };

  if (effect.type === 'flow/message') {
    return message(params);
  }

  if (effect.type === 'flow/choice') {
    return choice(params);
  }

  if (effect.type === 'flow/postJob') {
    return postJob(params);
  }

  if (effect.type === 'flow/requireSkills') {
    return requireSkills(params);
  }

  if (effect.type === 'flow/writeCode') {
    return writeCode(params);
  }

  throw new Error(`undefined effect ${JSON.stringify(effect)}`);
};
