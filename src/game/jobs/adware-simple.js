// @flow
import { message } from '../effects';
import { type FlowGenerator } from '../types';

export const filename = 'adware-simple';
export const title = 'Simple Adware App';

export function* flow(): FlowGenerator {
  yield message('Time to figure out how this goes...');
}
