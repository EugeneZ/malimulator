import { Dispatch } from 'redux';
import { getType } from 'typesafe-actions';
import { Listen } from './util/channel';
import * as Actions from './actionCreators';
import { ListenerResults } from './effectHandlers';

interface InitialParams {
  dispatch: Dispatch;
  listen: Listen<ListenerResults>;
}

export default function initial({ dispatch, listen }: InitialParams) {
  dispatch(
    Actions.receivedMessage({
      message: `Type 'list' to see your programs`,
    }),
  );
  listen(a => {
    if (
      a.type === getType(Actions.inputEntered) &&
      ['list', 'ls'].includes(a.payload)
    ) {
      setTimeout(() => {
        dispatch(Actions.receivedMessage({ message: `` }));
        dispatch(
          Actions.receivedMessage({
            message: `Type the name of a program to run it. Put a space after the program name and then type something to tell the program something. For example, 'list l*' will make 'list' tell you only programs that start with the letter 'l'. You'll have to discover other options on your own.`,
          }),
        );
      }, 500);
      return true;
    }
  });
}
