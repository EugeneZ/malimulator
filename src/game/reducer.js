// @flow strict
import { type GameState } from './types';
import { type Action } from './actionCreators';

const initialState = {
  jobs: [],
  messages: [],
  skills: [],
  code: [],
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
    case 'code/received':
      return {
        ...state,
        code: [...state.code, { jobId: action.data.jobId, done: false }],
      };
    case 'code/completed':
      return {
        ...state,
        code: [...state.code, { jobId: action.data.jobId, done: true }],
      };
    default:
      return state;
  }
}
