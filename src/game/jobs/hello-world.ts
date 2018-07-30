import { message, writeCode } from '../effects';
import { FlowGenerator } from '../types';

export const filename = 'hello-world';
export const title = 'Hello World';
export const description = 'Need to start somewhere.';

export function* flow({ language }: { language: { s: string } }): FlowGenerator {
  yield message(`Time to figure out how ${language} works...`);
  yield writeCode();
  yield message(`I learned ${language}!`);
}