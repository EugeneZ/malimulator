// @flow strict
import { message, postJob, require } from '../effects';
import { type FlowGenerator } from '../types';

export const filename = 'weather-simple';
export const title = 'Simple Adware App';

export function* flow(): FlowGenerator {
  yield message(
    `Something simple. Something basic. How hard can it be to get a basic weather forecast?`,
  );
  yield message(
    `Apparantly harder than it looks. After some net searches, you realize you need to learn how to code.`,
  );
  yield message(
    `Specifically, to write an app for your phone, you need to learn Java.`,
  );
  yield message(`At least, a little Java.`);
  yield message('Time to figure out how this goes...');
  yield postJob('hello-world', { language: 'java' });
  yield require(['java']);
  yield message('Ok, now you know enough Java to write this thing.');
}
