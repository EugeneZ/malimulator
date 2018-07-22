// @flow
export const message = (message: string) => ({
  type: 'flow/message',
  data: message,
});

export const choice = (choices: $ReadOnlyArray<string>) => ({
  type: 'flow/choices',
  data: choices,
});

export const postJob = (filename: string) => ({
  type: 'flow/postJob',
  data: filename,
});
