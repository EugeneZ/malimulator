import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CraftyContainer from './CraftyContainer';

function Transition(props: any) {
  return <Slide direction="up" {...props} />;
}

interface Props {};

interface State {
  open: boolean,
};

export default class Code extends React.PureComponent<Props, State> {
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
