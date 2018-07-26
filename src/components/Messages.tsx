import * as React from 'react';
import { findLast } from 'ramda';
import { MessagesState, Message } from '../game/types';

interface Props {
  messages: MessagesState,
};

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
          {messages.map(message => {
            const { jobId, job, message: text, choices } = message;
            return (
              <div>
                [{jobId}) {job.title}] {text}
                {choices &&
                  findLast<Message>(m => !!m.choices)(messages) === message &&
                  choices.map((choice, i) => (
                    <div style={{ paddingLeft: 20 }}>
                      {i + 1} -> {choice}
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
