import * as React from 'react';
import { playGame } from '../game/crafty';
// TODO import Crafty from 'craftyjs';
// TODO declare const Crafty: any;

export default class Code extends React.PureComponent<{}> {
  id: string = 'code_null';

  constructor(props: {}) {
    super(props);
    do {
      const suffix = Math.floor(Math.random() * 10000);
      this.id = `code_${suffix}`;
    } while (document.getElementById(this.id));
  }

  componentDidMount() {
    const target = document.getElementById(this.id);
    playGame(target);
  }

  render() {
    return <div id={this.id} style={{ backgroundColor: '#333'}}/>;
  }
}
