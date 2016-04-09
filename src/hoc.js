import React, { Component } from 'react';
import { pure } from 'recompose'

class OtherCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <h1 style={{ color: this.props.color }}>
        OtherCounter -- ({this.props.increment}): {this.state.counter} --
      </h1>
    );
  }
}

OtherCounter.defaultProps = {
  increment: 10,
}

export default pure(OtherCounter)
