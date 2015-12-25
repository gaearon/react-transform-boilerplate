# React Transform Boilerplate

[![react-transform channel on Discord](https://img.shields.io/badge/discord-react--transform%40reactiflux-61DAFB.svg?style=flat-square)](http://www.reactiflux.com)

:rocket: **Now  with [Babel 6](https://github.com/babel/babel) support** (thanks [@justingreenberg](https://github.com/justingreenberg))

This project is a reference implementation of **[babel-plugin-react-transform](https://github.com/gaearon/babel-plugin-react-transform)** can be used as a boilerplate for quickly getting a new project up and running with a few useful transforms:

* [**react-transform-hmr**](https://github.com/gaearon/react-transform-hmr) - enables hot reloading react components
* [**react-transform-catch-errors**](https://github.com/gaearon/react-transform-catch-errors) - catches errors inside `render()`

For convenience they are packed in a single preset called [**react-transform-hmre**](https://github.com/danmartinez101/babel-preset-react-hmre) but you can make your own.

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

## FAQ

#### Do I need to use it in my React project?

No! This is experimental stuff. It’s not polished, it doesn’t work in all browsers, the docs are poor, and it presumes you understand how Babel, Webpack, React, and other tools can work together. If you’re a beginner, we suggest you to work with more simple and stable boilerplates, and come back when you’re comfortable with them and want to experiment with your own tooling.

#### Should I run this on the server / in tests / in production?

No! This is only meant for client development environment. Make sure your `NODE_ENV` is neither `development` nor empty in these environments. Alternateively you can put the Babel configuration under a different `env` key and use your custom `NODE_ENV` or `BABEL_ENV` to turn these transforms on. Or you can [embed Babel configuration inside the Webpack config ](https://github.com/babel/babel-loader#options). No matter how you do it, **make sure you’re *only* running this transform in client-side development mode, and it is disabled on the server, in tests, and in production.**

#### I can’t serve images, use different HTML, add CSS, etc.

This project is a reference implementation of **[babel-plugin-react-transform](https://github.com/gaearon/babel-plugin-react-transform)**—it is just a Webpack bundle served by an Express server. It’s not meant to demonstrate every feature of either project. Please consult Webpack and Express docs to learn how to serve images, or bundle them into your JavaScript application.

#### My server is throwing a 404 after `npm run build`

Again, this boilerplate is **not** intended to be production ready. The 404 is because `index.html` is hard coded with the webpack bundle path in `/static/` (used by development server). You must manually update the script tag in `index.html` with the correct bundle path of `/dist/bundle.js` in order to use compiled source.

#### What errors does it catch?

`react-transform-catch-errors` catches **runtime errors inside `render()` method** of React componets it detects.
Webpack Hot Middleware catches **syntax errors anywhere in the module**.

These are two different tools and you need to be aware of that.

#### Can I use WebpackDevServer with this?

Absolutely! We only show Express server with `webpack-dev-middleware` and `webpack-hot-middleware` because people often have a Node server anyway, and it can be tricky to configure WebpackDevServer to work with existing server. Additionally, `webpack-hot-middleware` displays syntax errors in an overlay, which WebpackDevServer doesn’t do.

However you can use WebpackDevServer instead of the custom server just fine.

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
