import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import forceUpdate from 'react-deep-force-update'

const Components = new Map()

const methodsFrom = (obj) => {
  return Object.getOwnPropertyNames(obj)
    .filter((m) => typeof obj[m] == 'function')
}

const patchRender = (Component) => {
  const id = Component.__id
  return function(...args) {
    return Components.get(id).apply(this, args)
  }
}

const patchPrototype = (Component) => {
  methodsFrom(Component.prototype).forEach((method) => {
    Component.prototype[method].bind = (ctx, ...boundArgs) => {
      return (...args) => {
        return Component.prototype[method].call(ctx, ...boundArgs, ...args)
      }
    }
  })
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

    methodsFrom(PrevComponent.prototype).forEach((method) => {
      if (!(method in NextComponent.prototype)) {
        delete PrevComponent.prototype[method]
      }
    })
    methodsFrom(NextComponent.prototype).forEach((method) => {
      PrevComponent.prototype[method] = NextComponent.prototype[method]
    })

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
