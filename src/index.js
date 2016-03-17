import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import forceUpdate from 'react-deep-force-update'

const Components = new Map()

const patchRender = (Component) => {
  const id = Component.__id
  return function(...args) {
    return Components.get(id).apply(this, args)
  }
}

const patchPrototype = (Component) => {
  for (const method of Object.getOwnPropertyNames(Component.prototype)) {
    if (typeof Component.prototype[method] == 'function') {
      const bind = (ctx, ...boundArgs) => {
        return (...args) => {
          return Component.prototype[method].call(ctx, ...boundArgs, ...args)
        }
      }
      Component.prototype[method].bind = bind
    }
  }
}

const patchComponent = (Component) => {
  console.log('first', Component.__id)

  Components.set(Component.__id, Component)

  if (React.Component.prototype.isPrototypeOf(Component.prototype)) {
    patchPrototype(Component)
  } else {
    Component = patchRender(Component)
  }

  return Component
}

const updateComponent = (NextComponent) => {
  console.log('update', NextComponent.__id)

  const PrevComponent = Components.get(NextComponent.__id)
  if (!PrevComponent) {
    // this isn't registered as a react component, nothing to do
    return
  }

  if (React.Component.prototype.isPrototypeOf(NextComponent.prototype)) {
    patchPrototype(NextComponent)

    for (const method of Object.getOwnPropertyNames(NextComponent.prototype)) {
      PrevComponent.prototype[method] = NextComponent.prototype[method]
    }

    return PrevComponent
  } else {
    Components.set(NextComponent.__id, NextComponent)

    return NextComponent
  }
}

const realCreateElement = React.createElement

React.createElement = function createElement(type, ...args) {
  if (typeof type == 'function') {
    if (Components.has(type.__id)) {
      type = updateComponent(type)
    } else {
      type = patchComponent(type)
    }
  }

  return realCreateElement(type, ...args)
}

const tree = render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').App
    updateComponent(NextApp)
    forceUpdate(tree)
  })
}
