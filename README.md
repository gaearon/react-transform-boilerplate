# React Transform Boilerplate

[![react-transform channel on Discord](https://img.shields.io/badge/discord-react--transform%40reactiflux-61DAFB.svg?style=flat-square)](http://www.reactiflux.com)

## 🚧🚧🚧🚧🚧

### Highly Experimental

This is **highly experimental tech**. If you’re enthusiastic about hot reloading, by all means, give it a try, but don’t bet your project on it. Either of the technologies it relies upon may change drastically or get deprecated any day. You’ve been warned 😉 .

### Not a Boilerplate

While this is a boilerplate project, it is not the kind that you can copy, paste, and forget. It does not help you pick the right structure for your app, and it does not show how to handle problems like images, static assets, CSS, server rendering, etc.

**It exists to prototype next-generation React developer experience** with hot reloading that preserves component state and DOM, and error handling both for syntax and runtime errors in `render()`. You can learn techniques from this boilerplate and use them in your project but please don’t copy it blindly if you don’t know the underlying technologies well. Otherwise you are likely to get disillusioned with JavaScript tooling.

**No effort went into making this user-friendly yet. The goal is to eventually kill this technology** in favor of less hacky technologies baked into React. These projects are not long term.

### You May Not Need It

Even if you like hot reloading, you still may not need React Transform. **If you use something like [Redux](https://github.com/reactjs/redux) for managing your state, we suggest that you just [use Webpack HMR API directly instead of all the hacky proxies, Babel plugins, and all that jazz](https://github.com/reactjs/redux/pull/1455).** Seriously, check it out, it’s a much cleaner solution that may work great for you.

## About

This project is a reference implementation of **[babel-plugin-react-transform](https://github.com/gaearon/babel-plugin-react-transform)**. It can be used as a boilerplate demonstrating a few useful transforms:

* [**react-transform-hmr**](https://github.com/gaearon/react-transform-hmr) - enables hot reloading react components
* [**react-transform-catch-errors**](https://github.com/gaearon/react-transform-catch-errors) - catches errors inside `render()`

For convenience, they are packed in a single preset called [**react-transform-hmre**](https://github.com/danmartinez101/babel-preset-react-hmre) but you can make your own.

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

No! This is only meant for client development environment. Make sure your `NODE_ENV` is neither `development` nor empty in these environments. Alternatively you can put the Babel configuration under a different `env` key and use your custom `NODE_ENV` or `BABEL_ENV` to turn these transforms on. Or you can [embed Babel configuration inside the Webpack config ](https://github.com/babel/babel-loader#options). No matter how you do it, **make sure you’re *only* running this transform in client-side development mode, and it is disabled on the server, in tests, and in production.**

#### I can’t serve images, use different HTML, add CSS, etc.

This project is a reference implementation of **[babel-plugin-react-transform](https://github.com/gaearon/babel-plugin-react-transform)**—it is just a Webpack bundle served by an Express server. It’s not meant to demonstrate every feature of either project. Please consult Webpack and Express docs to learn how to serve images, or bundle them into your JavaScript application. For example, [you can use `express.static()` to serve static assets](https://github.com/gaearon/react-transform-boilerplate/pull/52).

#### I get “full reload needed” when I edit some files

Webpack hot module updates follow the import chain. As long as a module “ends up” being imported from components only, hot updates should work. If a specific module import chain ends in something like `index.js` which is not a component, hot updates will fail because `react-transform-hmr` has no idea how to handle updates to something other than components.

Note that by “components” we currently mean components created either by inheriting from `React.Component` or created with `React.createClass()`. We don’t currently support functional components although [this might be implemented for the future](https://github.com/gaearon/babel-plugin-react-transform/issues/57). If you use something like Redux, note that you can get support for functional components for free without React Transform—maybe [this is exactly what you want?](https://github.com/reactjs/redux/pull/1455)

That said you can write manual code to handle hot updates of modules that don’t end up consumed by components. For example, this is how [we hot replace reducers in Redux](https://github.com/reactjs/redux/blob/952b45d6d74f1789ddc4ed05043a2c6e1a5ea808/examples/async/store/configureStore.js#L13-L19).

#### What errors does it catch?

`react-transform-catch-errors` catches **runtime errors inside `render()` method** of React components it detects.
Webpack Hot Middleware catches **syntax errors anywhere in the module**.

These are two different tools and you need to be aware of that.

#### Can I use WebpackDevServer with this?

Absolutely! We only show Express server with `webpack-dev-middleware` and `webpack-hot-middleware` because people often have a Node server anyway, and it can be tricky to configure WebpackDevServer to work with existing server. Additionally, `webpack-hot-middleware` displays syntax errors in an overlay, which WebpackDevServer doesn’t do.

However, you can use WebpackDevServer instead of the custom server just fine.

#### I don’t see the syntax error overlay

Make sure your react-app is not attached to `document.body`. The client overlay provided by [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) will render into `document.body`. 

Attaching the React root node to `document.body` requires extra caution, as many third-party packages will append their markup to the body as well. React will replace the entire contents in the body on every re-render. Thus, you will not see the additional markup.

It’s always better to render your React app in a `#root` DOM element.

```js
import React from 'react'
import { render } from 'react-dom'
import { App } from 'app'
     
render(<App />, document.getElementById('root'))
```

#### How can I have multiple entry points?

Your config could look like this:

```js
const config = {
  entry: {
    A: ['webpack-hot-middleware/client', './src/a.js'],
    B: ['webpack-hot-middleware/client', './src/b.js']
  },
  // ...
}
```

Note that the order of files inside the entry point is important. And don’t forget to exclude the hot middleware client from the production builds!

## Discussion

You can discuss React Transform and related projects in **#react-transform** channel on [Reactiflux Discord](http://reactiflux.com).

## Thanks

* [@justingreenberg](https://github.com/justingreenberg) and [@thejameskyle](https://github.com/thejameskyle) for Babel 6 support.

## License

CC0 (public domain)
