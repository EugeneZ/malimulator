import { createAction, createStandardAction } from 'typesafe-actions';

export const message = createStandardAction('flow/message')<string>();
export const postJob = createAction(
  'flow/postJob',
  resolve => (filename: string, options?: any) =>
    resolve({
      filename,
      options,
    }),
);
export const gainedSkills = createStandardAction('flow/gainedSkills')<
  ReadonlyArray<string>
>();
export const requireSkills = createStandardAction('flow/requireSkills')<
  ReadonlyArray<string>
>(); 