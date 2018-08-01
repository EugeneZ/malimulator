import * as React from 'react';
import { connect } from 'react-redux';
import { GameState, Code } from '../game/types';
import { newGame, inputEntered, completedCodeTask } from '../game/actionCreators';
import Screen from './Screen';
import Input from './Input';
import Messages from './Messages';
import HorizontalSplitter from './HorizontalSplitter';
import { Dispatch } from 'redux';
import WriteCode from './WriteCode';

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
      const incompleteCode = code.filter(({done})=>!done);
      
      return (
        <Screen>
          <HorizontalSplitter
            top={<Messages messages={messages} />}
            bottom={<Input onInput={this.handleInput} />}
            bottomHeight={5}
          />
          {incompleteCode.length > 0 && <WriteCode code={incompleteCode[0]} onComplete={this.handleCodeComplete}/>}
        </Screen>
      );
    }

    handleInput = (input: string) => {
      this.props.dispatch(inputEntered(input));
    };

    handleCodeComplete = (code: Code) => {
      this.props.dispatch(completedCodeTask(code))
    }
  },
) as React.ComponentClass<{}>;
