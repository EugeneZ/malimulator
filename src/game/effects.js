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
  +meta?: ?{ [string]: mixed },
};
export const postJob = (
  filename: string,
  options?: { [string]: mixed },
): PostJobEffect => ({
  type: 'flow/postJob',
  data: filename,
  meta: options,
});

export type RequireEffect = {
  +type: 'flow/require',
  +data: $ReadOnlyArray<string>,
};
export const require = (skills: $ReadOnlyArray<string>): RequireEffect => ({
  type: 'flow/require',
  data: skills,
});

export type WriteCodeEffect = {
  +type: 'flow/writeCode',
};
export const writeCode = (): WriteCodeEffect => ({
  type: 'flow/writeCode',
});

export type Effect =
  | MessageEffect
  | ChoiceEffect
  | PostJobEffect
  | RequireEffect
  | WriteCodeEffect;
