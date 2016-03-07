import React, { Component } from 'react';
import { register } from './patchReact';

export default class Counter extends Component {
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
        Counter ({this.props.increment}): {this.state.counter}
      </h1>
    );
  }
}

Counter.getStuff = () => {
  return 43
}

// would be generated
register('Counter#Counter', Counter);
module.hot.accept()

// note: easy to generate this
// for module.exports too for non-Babel users
// Object.keys(module.exports).forEach(...)

// functions can be registered exactly the same way



