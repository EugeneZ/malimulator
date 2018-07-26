import { ActionType, getType } from 'typesafe-actions';
import * as Actions from './actionCreators';
import { GameState } from './types';

const initialState = {
  jobs: [],
  messages: [],
  skills: [],
  code: [],
};

export default function reducer(
  state: GameState = initialState,
  action: ActionType<typeof Actions>,
) {
  switch (action.type) {
    case getType(Actions.receivedMessage):
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case getType(Actions.receivedChoices):
      return {
        ...state,
        messages: [...state.messages, { message: 'Choose:', ...action.payload }],
      };
    case getType(Actions.recievedCodeTask):
      return {
        ...state,
        code: [...state.code, { jobId: action.payload.jobId, done: false }],
      };
    case getType(Actions.completedCodeTask):
      return {
        ...state,
        code: [...state.code, { jobId: action.payload.jobId, done: true }],
      };
    default:
      return state;
  }
}
