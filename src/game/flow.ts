import { ActionType } from 'typesafe-actions';
import * as Effects from './effects';
import * as Intro from './jobs/intro';
import { JobWithFlow, GameState } from './types';
import * as Actions from './actionCreators';
import channel from './util/channel';
import effectHandlers, { ListenerResults } from './effectHandlers';
import { Dispatch } from 'redux';

export default function flowMiddleware<T>({
  getState,
  dispatch,
}: {
  getState: ()=>GameState,
  dispatch: Dispatch
}) {
  const { put, listen } = channel<ListenerResults>();

  let currentJobId = 1;

  return (next: Dispatch) => (action: ActionType<typeof Actions>) => {
    put(action);
    if (action && action.type === 'state/newGame') {
      dispatch(Actions.runFlow(Intro, undefined));
    }
    if (
      action &&
      typeof action.type === 'string' &&
      action.type === 'flow/run'
    ) {
      import(`./jobs/${action.payload.filename}`).then(
        async (job: JobWithFlow) => {
          const generator = job.flow(action.meta);
          const jobId = currentJobId++;
          let nextArg: ListenerResults;
          while (true) {
            const { value, done }: { value: ActionType<typeof Effects>, done: boolean } = generator.next(nextArg);

            if (done) {
              break;
            }

            if (!value) {
              throw new Error('You must only yield effects.');
            }

            nextArg = await effectHandlers(value, dispatch, jobId, getState, listen, job);
          }
        },
      );
    }

    return next(action);
  };
}
