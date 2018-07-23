// @flow strict
import React, { PureComponent } from 'react';

type Props = {
  messages: $ReadOnlyArray<string>,
};

export default class Messages extends PureComponent<Props> {
  render() {
    return (
      <div
        style={{
          fontFamily: 'Consolas, serif',
          color: 'lime',
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
      >
        <div style={{ position: 'absolute', bottom: 0 }}>
          {this.props.messages.map(message => <div>{message}</div>)}
        </div>
      </div>
    );
  }
}
