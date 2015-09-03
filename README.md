react-transform-boilerplate
=====================

A *new* Webpack boilerplate with hot reloading React components, and error handling on module and component level. The component instrumentation is implemented on top of [babel-plugin-react-transform](https://github.com/gaearon/babel-plugin-react-transform):

* [react-transform-webpack-hmr](https://github.com/gaearon/react-transform-webpack-hmr) handles hot reloading
* [react-transform-catch-errors](https://github.com/gaearon/react-transform-catch-errors) catches component errors

The module level errors are displayed in an overlay by [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) which is used instead of Webpack Dev Server.

## Try It

```
git clone https://github.com/gaearon/react-transform-boilerplate.git
cd react-transform-boilerplate
npm install
npm start
open http://localhost:3000
```

## License

MIT