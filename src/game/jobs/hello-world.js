// @flow strict
import { message } from '../effects';
import { type FlowGenerator } from '../types';

export const filename = 'hello-world';
export const title = 'Hello World';
export const description = 'Need to start somewhere.';

export function* flow({ language }: { language: string }): FlowGenerator {
  yield message(`Time to figure out how ${language} works...`);
}
