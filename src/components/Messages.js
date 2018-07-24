// @flow strict
import React, { PureComponent } from 'react';
import { type MessagesState } from '../game/types';

type Props = {
  messages: MessagesState,
};

export default class Messages extends PureComponent<Props> {
  render() {
    const { messages } = this.props;

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
          {messages.map((message, i) => {
            const { jobId, job, message: text, choices } = message;
            console.log(
              message,
              i,
              messages,
              messages.lastIndexOf(message) === i,
            );
            return (
              <div>
                [{jobId}) {job.title}] {text}
                {choices &&
                  messages.lastIndexOf(message) === i &&
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
