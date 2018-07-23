// @flow strict
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { type GameState } from '../game/types';
import { newGame, inputEntered } from '../game/actionCreators';
import Screen from './Screen';
import Input from './Input';
import Messages from './Messages';
import HorizontalSplitter from './HorizontalSplitter';
import { type Dispatch } from 'redux';

export default connect((state: GameState) => state)(
  class Game extends PureComponent<{ dispatch: Dispatch<*> } & GameState> {
    componentDidMount() {
      this.props.dispatch(newGame());
    }

    render() {
      const { messages } = this.props;
      return (
        <Screen>
          <HorizontalSplitter
            top={<Messages messages={messages} />}
            bottom={<Input onInput={this.handleInput} />}
            bottomHeight={5}
          />
        </Screen>
      );
    }

    handleInput = (input: string) => {
      this.props.dispatch(inputEntered(input));
    };
  },
);
