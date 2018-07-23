// @flow strict
export type MessageEffect = {
  +type: 'flow/message',
  +data: string,
};
export const message = (message: string): MessageEffect => ({
  type: 'flow/message',
  data: message,
});

export type ChoiceEffect = {
  +type: 'flow/choices',
  +data: $ReadOnlyArray<string>,
};
export const choice = (choices: $ReadOnlyArray<string>): ChoiceEffect => ({
  type: 'flow/choices',
  data: choices,
});

export type PostJobEffect = {
  +type: 'flow/postJob',
  +data: string,
};
export const postJob = (filename: string): PostJobEffect => ({
  type: 'flow/postJob',
  data: filename,
});

export type Effect = MessageEffect | ChoiceEffect | PostJobEffect;
