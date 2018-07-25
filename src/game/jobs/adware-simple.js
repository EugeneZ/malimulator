// @flow strict
import { message, require } from '../effects';
import { type FlowGenerator } from '../types';

export const filename = 'adware-simple';
export const title = 'Simple Adware App';

export function* flow(): FlowGenerator {
  yield message(
    `Someone's already done the hard work of making the app. You just need to learn how to copy that.`,
  );
  yield message(
    `You hop on the net and do some searching. Nothing comes easy.`,
  );
  yield message(
    `There's answers here, but you don't understand most of this terminology.`,
  );
  yield message(
    `Sounds like you need to understand how to clone apps, and how to use ad networks...`,
  );
  yield message('Time to figure out how this goes...');
  yield require(['app cloning', 'ad networks']);
}
