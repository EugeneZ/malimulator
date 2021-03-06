import * as React from 'react';

interface Props {
  onInput: (value: string) => void;
}

interface State {
  input: string;
}

export default class GUI extends React.PureComponent<Props, State> {
  state = {
    input: '',
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: 'black',
          height: 100,
          borderTop: '1px solid grey',
          padding: 2,
        }}
      >
        <input
          type="text"
          style={{
            border: 0,
            padding: '0 10px',
            background: 'none',
            caretColor: 'lime',
            color: 'lime',
            width: '100%',
            height: '5vh',
            fontSize: 24,
            fontFamily: 'Consolas, serif',
            outline: 'none',
          }}
          value={this.state.input}
          onChange={e => this.setState({ input: e.currentTarget.value })}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }

  handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.props.onInput(this.state.input);
      this.setState({ input: '' });
    }
  };
}
