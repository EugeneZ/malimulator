// @flow strict
import { type MiddlewareAPI, type Dispatch } from 'redux';
import * as Intro from './jobs/intro';
import { type JobWithFlow } from './types';
import { runFlow, type Action } from './actionCreators';
import channel from './util/channel';
import effectHandlers from './effectHandlers';

const effectTypes = Object.keys(effectHandlers);

export default function flowMiddleware({
  getState,
  dispatch,
}: MiddlewareAPI<*, Action, Dispatch<Action>>) {
  const { put, listen } = channel();

  let currentJobId = 1;

  return (next: Dispatch<Action>) => (action: Action) => {
    put(action);
    if (action && action.type === 'state/newGame') {
      dispatch(runFlow(Intro));
    }
    if (
      action &&
      typeof action.type === 'string' &&
      action.type === 'flow/run'
    ) {
      import(`./jobs/${action.data.filename}`).then(
        async (job: JobWithFlow<*>) => {
          const generator = job.flow(action.meta);
          let jobId = currentJobId++;
          let nextArg;
          while (true) {
            const { value, done } = generator.next(nextArg);

            if (done) {
              break;
            }

            if (!value) {
              throw new Error('You must only yield effects.');
            }

            if (!effectTypes.includes(value.type)) {
              throw new Error(`undefined effect ${JSON.stringify(value)}`);
            }

            nextArg = await effectHandlers[value.type]({
              value,
              dispatch,
              jobId,
              job,
              getState,
              listen,
            });
          }
        },
      );
    }

    return next(action);
  };
}
