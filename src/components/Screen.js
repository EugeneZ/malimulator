// @flow
import React, { PureComponent, type Node } from 'react';

type Props = {
  children: Node,
}

export default class Screen extends PureComponent<Props> {
  render() {
    return (
      <div
        style={{
          backgroundColor: 'black',
          height: '100vh',
          maxHeight: '100vh',
        }}
      >
        {this.props.children}
      </div>
    )
  }
}