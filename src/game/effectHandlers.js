// @flow strict
import { type Dispatch } from 'redux';
import {
  receivedChoices,
  receivedMessage,
  runFlow,
  recievedCodeTask,
  type Action,
} from './actionCreators';
import { type Effect } from './effects';
import { type Job } from './types';

function checkForSkills(getState, skills) {
  const state = getState().skills;
  for (let skill of skills) {
    if (!state.includes(skill)) {
      return false;
    }
  }

  return true;
}

type EffectHandlerParams<T> = {
  dispatch: Dispatch<Action>,
  value: Effect,
  jobId: number,
  job: Job,
  listen: ((Action) => T) => Promise<*>,
  getState: () => *,
};

type EffectHandler<T> = (EffectHandlerParams<T>) => Promise<mixed>;

type EffectHandlerMap<T> = { [string]: EffectHandler<T> };

const effectHandlerMap: EffectHandlerMap<*> = {
  'flow/message': async ({ dispatch, value, jobId, job }) => {
    if (typeof value.data !== 'string') {
      throw new Error('Message effect data must be a string');
    }
    dispatch(receivedMessage(jobId, job, `${value.data}`));
  },
  'flow/choices': async ({ dispatch, value, jobId, job, listen }) => {
    if (!Array.isArray(value.data)) {
      throw new Error('Choice effect data must be an array');
    }
    dispatch(receivedChoices(jobId, job, value.data));
    return [
      await listen(action => {
        if (action.type !== 'input/entered') {
          return null;
        }
        const num = parseInt(action.data, 10);

        if (num > 0 && num <= value.data.length) {
          return num - 1;
        }

        return null;
      }),
    ];
  },
  'flow/postJob': async ({ dispatch, value }) => {
    import(`./jobs/${value.data}`).then(
      job =>
        value.type === 'flow/postJob' && dispatch(runFlow(job, value.meta)),
    );
  },
  'flow/require': async ({ value, getState, listen }) => {
    while (!checkForSkills(getState, value.data)) {
      await listen(action => action.type === 'skills/received');
    }
  },
  'flow/writeCode': async ({ jobId, listen, dispatch }) => {
    dispatch(recievedCodeTask(jobId));
    await listen(action => {
      if (action.type !== 'code/completed' || action.data.jobId !== jobId) {
        return null;
      }
    });
  },
};

export default effectHandlerMap;
