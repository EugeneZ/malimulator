import * as React from 'react';

interface Props {
  children: React.ReactNode,
};

export default class Screen extends React.PureComponent<Props> {
  render() {
    return (
      <div
        style={{
          background: `url(/screen.jpg) center top`,
          backgroundSize: 'cover',
          height: '100vh',
          maxHeight: '100vh',
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
