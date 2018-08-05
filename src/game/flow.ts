import { ActionType, getType } from 'typesafe-actions';
import { Dispatch } from 'redux';
import * as Effects from './effects';
import { GameState } from './types';
import * as Actions from './actionCreators';
import channel from './util/channel';
import effectHandlers, { ListenerResults } from './effectHandlers';
import initial from './initial';
import { getProgram } from './jobs';

export default function flowMiddleware({
  getState,
  dispatch,
}: {
  getState: () => GameState;
  dispatch: Dispatch;
}) {
  const { put, listen } = channel<ListenerResults>();

  return (next: Dispatch) => async (action: ActionType<typeof Actions>) => {
    put(action);
    if (action && action.type === 'state/newGame') {
      initial({ dispatch, listen });
    }
    if (action && action.type === getType(Actions.inputEntered)) {
      const [name, ...args] = action.payload.split(' ');
      const program = getProgram(name);
      if (!program) {
        dispatch(
          Actions.receivedMessage({ message: `Program not found: ${name}` }),
        );
        return next(action);
      }

      const generator = program.run({ getState, args });
      let nextArg: ListenerResults;

      while (true) {
        const {
          value,
          done,
        }: {
          value: ActionType<typeof Effects>;
          done: boolean;
        } = generator.next(nextArg);

        if (done) {
          break;
        }

        if (!value) {
          throw new Error('You must only yield effects.');
        }

        nextArg = await effectHandlers(value, dispatch, getState, listen);
      }
    }

    return next(action);
  };
}
