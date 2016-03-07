import React, { Component } from 'react';
import Counter from './Counter';
import { NICE, SUPER_NICE } from './colors';
import { register } from './patchReact';

export class App extends Component {
  render() {
    return (
      <div>
        <Counter increment={1} color={NICE} />
        <Counter increment={5} color={SUPER_NICE} />
        {Counter.getStuff()}
      </div>
    );
  }
}

// would be generated
register('App#App', App)
module.hot.accept()

