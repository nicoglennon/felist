import React, { Component } from 'react';

const animationStyle = {
    transition: 'width 1s cubic-bezier(1,0,0,1)'
};

const makeExpanding = (Target) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { isOpen: false }
    }

    onClick = () => {
      this.setState({ isOpen: !this.state.isOpen })
    };

    render() {
      return (
        <Target {...this.props}
                isOpen={this.state.isOpen}
                onClick={this.onClick}
                additionalStyles={
                  {text: animationStyle, frame: animationStyle}
                }
        />
      );
    }
  }
}

export default makeExpanding;
