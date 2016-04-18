import React, { Component } from 'react';
import { NICE, SUPER_NICE } from './colors';
import OtherCounter from './hoc'

class Counter extends Component {
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

Counter.__id = 'Counter'

export class App extends Component {
  constructor(props) {
    super(props)
    this.blah = this.blah.bind(this)
  }

  blah() {
    console.log('App.prototype.render was called')
  }

  render() {
    this.blah()
    return (
      <div>
        <BogusContainer>
          <Counter increment={10} color={NICE} />
        </BogusContainer>
        <Counter increment={100} color={SUPER_NICE} />
        <Counter increment={5} color={SUPER_NICE} />
        <OtherCounter increment={5} color={NICE} />
      </div>
    );
  }
}

App.__id = 'App'

const BogusContainer = ({children}) => <div>bogus: {children}</div>

BogusContainer.__id = 'BogusText'

export const AppSFC = () => <App />

AppSFC.__id = 'AppSFC'
