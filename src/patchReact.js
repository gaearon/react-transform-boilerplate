import React from 'react';
import { createProxy, getForceUpdate } from 'react-proxy';

let proxies = {}
let forceUpdate = getForceUpdate(React);

export function register(id, type) {
  type.id = id;
  let proxy = proxies[id];
  if (proxy) {
    let instances = proxy.update(type)
    instances.forEach(forceUpdate)
  } else {
    proxy = proxies[id] = createProxy(type)
  }
}

// Resolve when elements are created, not during type definition!
const realCreateElement = React.createElement;
React.createElement = (type, ...args) => {
  if (type.id) {
    type = proxies[type.id].get()
  }

  return realCreateElement(type, ...args);
}
