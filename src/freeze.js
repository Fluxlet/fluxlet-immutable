export let enableFreeze = true

/**
 * Recursively freeze an object/array making it immutable
 */
export function deepFreeze(v) {
  return enableFreeze ? doFreeze(true, v) : v
}

/**
 * Freeze an object/array
 */
export function freeze(v) {
  return enableFreeze ? doFreeze(false, v) : v
}

function doFreeze(deep, v) {
  if (v != null && typeof v === 'object' && !Object.isFrozen(v)) {
      Object.freeze(v)
      if (deep) {
        if (Array.isArray(v)) {
          v.forEach(e => doFreeze(true, e))
        } else {
          Object.getOwnPropertyNames(v).forEach(p => doFreeze(true, v[p]))
        }
      }
  }
  return v
}
