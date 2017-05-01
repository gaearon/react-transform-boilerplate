/* @flow */

import React, { Component } from 'react';
import { NICE, SUPER_NICE } from './colors';

class Counter extends Component {
  constructor(props: ?Object) {
    super(props);
    this.state = { counter: 0 };
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick(): void {
    this.setState({
      counter: this.state.counter + this.props.increment
    });
  }

  componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  render(): ReactElement {
    return (
      <h1 style={{ color: this.props.color }}>
        Counter ({this.props.increment}): {this.state.counter}
      </h1>
    );
  }
}

export class App extends Component {
  render(): ReactElement {
    return (
      <div>
        <Counter increment={1} color={NICE} />
        <Counter increment={5} color={SUPER_NICE} />
      </div>
    );
  }
}
