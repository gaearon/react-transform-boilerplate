import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

render(
    <AppContainer
        component={App}
    />,
    document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(
      <AppContainer
        component={require('./App').default}
      />,
      document.getElementById('root')
    );
  });
}