import { ActionType, getType } from 'typesafe-actions';
import * as Actions from './actionCreators';
import { GameState } from './types';

const initialState: GameState = {
  jobs: [],
  messages: [],
  skills: [],
  code: [],
};

export default function reducer(
  state = initialState,
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
        messages: [
          ...state.messages,
          { message: 'Choose:', ...action.payload },
        ],
      };
    case getType(Actions.recievedCodeTask):
      return {
        ...state,
        code: [...state.code, { jobId: action.payload.jobId, done: false }],
      };
    case getType(Actions.completedCodeTask):
      const { jobId } = action.payload;
      return {
        ...state,
        code: [
          ...state.code.filter(({ jobId: id }) => id !== jobId),
          { jobId, done: true },
        ],
      };
    case getType(Actions.receivedSkills):
      return {
        ...state,
        skills: [...state.skills, ...action.payload],
      };
    default:
      return state;
  }
}
