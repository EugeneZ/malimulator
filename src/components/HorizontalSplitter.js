// @flow strict
import React, { PureComponent, type Node } from 'react';

type Props = {
  top: Node,
  bottom: Node,
  bottomHeight: number,
};

export default class Messages extends PureComponent<Props> {
  render() {
    const { top, bottom, bottomHeight } = this.props;
    return (
      <div>
        <div style={{ height: `${100 - bottomHeight}vh`, overflowY: 'scroll' }}>
          {top}
        </div>
        <div style={{ height: `${bottomHeight}vh` }}>{bottom}</div>
      </div>
    );
  }
}
