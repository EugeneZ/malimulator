// @flow
import { type Attributes } from './types';

export default class Actor {
  attributes = {};
  constructor(attributes: Attributes) {
    this.attributes = attributes;
  }
}