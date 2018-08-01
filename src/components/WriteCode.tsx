import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CraftyContainer from './CraftyContainer';
import { Code } from '../game/types';

function Transition(props: any) {
  return <Slide direction="up" {...props} />;
}

interface Props {
  code: Code;
  onComplete: (code: Code) => void;
}

interface State {
  open: boolean;
}

export default class WriteCode extends React.PureComponent<Props, State> {
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
        <CraftyContainer onComplete={this.handleComplete} />
      </Dialog>
    );
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleComplete = () => this.props.onComplete(this.props.code);
}
