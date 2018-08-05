import * as React from 'react';
import { findLast } from 'ramda';
import { MessagesState, Message } from '../game/types';

interface Props {
  messages: MessagesState;
}

export default class Messages extends React.PureComponent<Props> {
  render() {
    const { messages } = this.props;

    return (
      <div
        style={{
          fontFamily: `'Share Tech Mono', monospace`,
          color: 'lime',
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
      >
        <div style={{ position: 'absolute', bottom: 0 }}>
          {messages.map(({message}, i) => 
              <div key={i}>
                {message}&nbsp;
              </div>
          )}
        </div>
      </div>
    );
  }
}
