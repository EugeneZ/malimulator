import * as React from 'react';
import { playGame } from '../game/crafty';
// TODO import Crafty from 'craftyjs';
// TODO declare const Crafty: any;

interface Props {
  onComplete: () => void;
}

export default class Code extends React.PureComponent<Props> {
  id: string = 'code_null';

  constructor(props: Props) {
    super(props);
    do {
      const suffix = Math.floor(Math.random() * 10000);
      this.id = `code_${suffix}`;
    } while (document.getElementById(this.id));
  }

  componentDidMount() {
    const target = document.getElementById(this.id);
    playGame(target).then(() => {
      this.props.onComplete();
    });
  }

  render() {
    return <div id={this.id} style={{ backgroundColor: '#333' }} />;
  }
}
