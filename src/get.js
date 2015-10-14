import { path as bakePath } from "./path"

// # get
//
// Retreives a value from a state by a path, or a value supplier function.
//
//     (path|supplier) -> (state) -> value
//
export function get(supplier) {
  if (typeof supplier === 'function') {
    return supplier
  }

  const path = bakePath(supplier);

  return (root) => {
    // walk the path given the next object/array and the step along the path
    function walk(container, step) {
      // check we have a valid container
      if (!container || !(typeof container === "object")) {
        throw new TypeError(`failed to get value of path, expecting an Object or Array at: '${path.slice(0, step).join('.')}' got: ${container}`)
      }

      // get the key within the container from the current step in the path
      const key = path[step]

      // if we've not reached the end of the path keep walking, otherwise return the value found
      return step + 1 < path.length ? walk(container[key], step + 1) : container[key]
    }

    return walk(root, 0)
  }
}
