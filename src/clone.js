
export function cloneAndSet(container, key, value) {
  if (Array.isArray(container)) {
    return cloneArray(container, key, value)
  } else if (container && typeof container === "object") {
    return cloneObject(container, key, value)
  }
  return container
}

function cloneArray(array, key, value) {
  const idx = +key
  return array.reduce((cloned, v, i) => {
    if (i !== idx) {
      cloned[i] = v
    }
    return cloned
  }, seedClone([], idx, value))
}

function cloneObject(object, prop, value) {
  return Object.getOwnPropertyNames(object).reduce((cloned, p) => {
    if (p !== prop) {
      cloned[p] = object[p]
    }
    return cloned
  }, seedClone({}, prop, value))
}

function seedClone(container, key, value) {
  if (value !== undefined) {
    container[key] = value
  }
  return container
}
