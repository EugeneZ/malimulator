import * as React from 'react';
import { connect } from 'react-redux';
import { GameState } from '../game/types';
import { newGame, inputEntered } from '../game/actionCreators';
import Screen from './Screen';
import Input from './Input';
import Messages from './Messages';
import HorizontalSplitter from './HorizontalSplitter';
import { Dispatch } from 'redux';
import Code from './Code';

type Props = {
  dispatch: Dispatch,
} & GameState;

export default connect(state => state)(
  class Game extends React.PureComponent<Props> {
    componentDidMount() {
      this.props.dispatch(newGame());
    }

    render() {
      const { messages, code } = this.props;
      return (
        <Screen>
          <HorizontalSplitter
            top={<Messages messages={messages} />}
            bottom={<Input onInput={this.handleInput} />}
            bottomHeight={5}
          />
          {code.length > 0 && <Code />}
        </Screen>
      );
    }

    handleInput = (input: string) => {
      this.props.dispatch(inputEntered(input));
    };
  },
) as React.ComponentClass<{}>;
