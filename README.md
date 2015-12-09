# React Transform Boilerplate

[![react-transform channel on Discord](https://img.shields.io/badge/discord-react--transform%40reactiflux-61DAFB.svg?style=flat-square)](http://www.reactiflux.com)

:rocket: **Now  with [Babel 6](https://github.com/babel/babel) support** (thanks [@justingreenberg](https://github.com/justingreenberg))

This project is a reference implementation of **[babel-plugin-react-transform](https://github.com/gaearon/babel-plugin-react-transform)** can be used as a boilerplate for quickly getting a new project up and running with a few useful transforms:

* [**react-transform-hmr**](https://github.com/gaearon/react-transform-hmr) - enables hot reloading react components
* [**react-transform-catch-errors**](https://github.com/gaearon/react-transform-catch-errors) - catches errors inside `render()`

Syntax errors are displayed in an overlay using **[@glenjamin](https://github.com/glenjamin)**’s **[webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)**, which replaces Webpack Dev Server. This project **[does not](https://medium.com/@dan_abramov/the-death-of-react-hot-loader-765fa791d7c4)** use React Hot Loader.

## Demo

![react-transform-boilerplate](https://cloud.githubusercontent.com/assets/1539088/11611771/ae1a6bd8-9bac-11e5-9206-42447e0fe064.gif)

## Installation

```bash
git clone https://github.com/gaearon/react-transform-boilerplate.git
cd react-transform-boilerplate
npm install
npm start
open http://localhost:3000
```

Transforms are enabled for files inside `src` (except `index.js`).

## Troubleshooting

#### I can’t serve images, use different HTML, etc.

This project is a reference implementation of **[babel-plugin-react-transform](https://github.com/gaearon/babel-plugin-react-transform)**—it is just a Webpack bundle served by an Express server. It’s not meant to demonstrate every feature of either project. Please consult Webpack and Express docs to learn how to serve images, or bundle them into your JavaScript application.

#### My server is throwing a 404 after `npm run build`

Again, this boilerplate is **not** intended to be production ready. The 404 is because `index.html` is hard coded with the webpack bundle path in `/static/` (used by development server). You must manually update the script tag in `index.html` with the correct bundle path of `/dist/bundle.js` in order to use compiled source.

#### I don’t see the syntax error overlay

Make sure your react-app is not attached to `document.body`. The client overlay provided by [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) will render into `document.body`. 

Attaching the React root node to `document.body` requires extra caution, as many third-party packages will append their markup to the body as well. React will replace the entire contents in the body on every re-render. Thus you will not see the additional markup.

It’s always better to render your React app in a `#root` DOM element.

```js
import React from 'react'
import { render } from 'react-dom'
import { App } from 'app'
     
render(<App />, document.getElementById('root'))
```

## Discussion

You can discuss React Transform and related projects in **#react-transform** channel on [Reactiflux Discord](http://reactiflux.com).

## License

CC0 (public domain)
domain)
