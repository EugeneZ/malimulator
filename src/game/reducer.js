// @flow strict
import { type GameState } from './types';
import { type Action } from './actionCreators';

const initialState = {
  jobs: [],
  messages: [],
  skills: [],
};

export default function reducer(
  state: GameState = initialState,
  action: Action,
) {
  switch (action.type) {
    case 'message/received':
      return {
        ...state,
        messages: [...state.messages, action.data],
      };
    case 'choices/received':
      return {
        ...state,
        messages: [...state.messages, { message: 'Choose:', ...action.data }],
      };
    default:
      return state;
  }
}
