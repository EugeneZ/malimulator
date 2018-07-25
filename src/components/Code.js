// @flow strict
import React, { PureComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CraftyContainer from './CraftyContainer';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

type Props = {};

type State = {
  open: boolean,
};

export default class Code extends PureComponent<Props, State> {
  state = {
    open: true,
  };

  render() {
    return (
      <Dialog
        fullScreen
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <CraftyContainer />
      </Dialog>
    );
  }

  handleClose = () => {};
}
