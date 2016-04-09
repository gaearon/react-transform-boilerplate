import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import forceUpdate from 'react-deep-force-update'

const id = (Component) => Component.__id || Component.displayName || Component.name

const Components = new Map()
const SFCWrappers = new Map()
const Updated = new WeakSet()

const methodsFrom = (obj) => {
  return Object.getOwnPropertyNames(obj)
    .filter((m) => typeof obj[m] == 'function')
}

const patchRender = (Component) => {
  const _id = id(Component)
  SFCWrappers.set(_id, function(...args) {
    return Components.get(_id).apply(this, args)
  })
  return SFCWrappers.get(_id)
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
  console.log('first', id(Component))

  Components.set(id(Component), Component)
  Updated.add(Component)

  if (React.Component.prototype.isPrototypeOf(Component.prototype)) {
    // `class extends React.Component` components
    patchPrototype(Component)
  } else if (Object.getPrototypeOf(Component.prototype) == Object.prototype) {
    // SFCs
    Component = patchRender(Component)
  }

  return Component
}

const updateComponent = (NextComponent) => {
  const PrevComponent = Components.get(id(NextComponent))

  if (!PrevComponent) {
    // this isn't registered as a react component, nothing to do
    return
  }

  if (Updated.has(NextComponent)) {
    // this component has been updated, just return the original
    return PrevComponent
  }

  Updated.add(NextComponent)
  console.log('update', id(NextComponent))

  if (React.Component.prototype.isPrototypeOf(NextComponent.prototype)) {
    // `class extends React.Component` components
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

  } else if (Object.getPrototypeOf(NextComponent.prototype) == Object.prototype) {
    // SFCs
    Components.set(id(NextComponent), NextComponent)
    return SFCWrappers.get(id(NextComponent))

  } else {
    // React.createElement() components I guess
    return NextComponent
  }
}

const realCreateElement = React.createElement

React.createElement = function createElement(type, ...args) {
  if (typeof type == 'function') {
    if (Components.has(id(type))) {
      type = updateComponent(type)
    } else if (!Updated.has(type)) {
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
