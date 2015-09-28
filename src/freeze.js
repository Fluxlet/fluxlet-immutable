// # enableFreeze
//
// Freezing can be enabled/disable with this flag
//
export let enableFreeze = true

// # deepFreeze
//
// Recursively freeze an object/array making it immutable.
// If the given value is already frozen it is assumed to be deep frozen already and it will not attempt it again.
//
export function deepFreeze(v) {
  return enableFreeze ? doFreeze(true, v) : v
}

// # freeze
//
// Shallow freeze an object/array
//
export function freeze(v) {
  return enableFreeze ? doFreeze(false, v) : v
}

function doFreeze(deep, v) {
  if (v != null && typeof v === 'object' && !Object.isFrozen(v)) {
      // Freeze the object itself
      Object.freeze(v)
      if (deep) {
        if (Array.isArray(v)) {
          // Deep freeze every element of the array
          v.forEach(e => doFreeze(true, e))
        } else {
          // Deep freeze all of an objects own properties
          Object.getOwnPropertyNames(v).forEach(p => doFreeze(true, v[p]))
        }
      }
  }
  return v
}
