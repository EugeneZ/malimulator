// @flow strict
import { type MiddlewareAPI, type Dispatch } from 'redux';
import * as Intro from './jobs/intro';
import { type Job } from './types';
import {
  receivedChoices,
  receivedMessage,
  runFlow,
  type Action,
} from './actionCreators';
import channel from './util/channel';

export default function flowMiddleware({
  getState,
  dispatch,
}: MiddlewareAPI<*, Action, Dispatch<Action>>) {
  const { put, listen } = channel();
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
        async ({ flow, title }: Job) => {
          const generator = flow();
          let nextArg;
          while (true) {
            const { value, done } = generator.next(nextArg);
            nextArg = undefined;

            if (!value) {
              throw new Error('You must only yield effects.');
            }

            if (done) {
              break;
            }

            switch (value.type) {
              case 'flow/message':
                if (typeof value.data !== 'string') {
                  throw new Error('Message effect data must be a string');
                }
                dispatch(receivedMessage(`[${title}] ${value.data}`));
                continue;
              case 'flow/choices':
                if (!Array.isArray(value.data)) {
                  throw new Error('Choice effect data must be an array');
                }
                dispatch(receivedChoices(value.data));
                nextArg = [
                  await listen(action => {
                    return action.type === 'input/entered' &&
                      action.data &&
                      ['1', '2'].includes(action.data)
                      ? parseInt(action.data, 10) - 1
                      : null;
                  }),
                ];
                continue;
              default:
                throw new Error(`undefined effect ${JSON.stringify(value)}`);
            }
          }
        },
      );
    }

    return next(action);
  };
}
