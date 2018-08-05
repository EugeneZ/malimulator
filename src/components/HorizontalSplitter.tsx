import * as React from 'react';

interface Props {
  top: React.ReactNode;
  bottom: React.ReactNode;
  bottomHeight: number;
}

export default class Messages extends React.PureComponent<Props> {
  render() {
    const { top, bottom, bottomHeight } = this.props;
    return (
      <div>
        <div style={{ height: `${100 - bottomHeight}vh`}}>
          {top}
        </div>
        <div style={{ height: `${bottomHeight}vh` }}>{bottom}</div>
      </div>
    );
  }
}
