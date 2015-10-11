
// # get
//
// Retreives a value from a state by a path, or function.
//
//     (path|fn) -> (state) -> value
//
export function get(source) {
  if (typeof source === 'function') {
    return source
  }

  let path = source;

  if (path && path.split) {
    path = path.split('.')
  }

  if (!path || !path.length || !path.slice) {
    throw new TypeError("expected a function or a non-empty path as a String or Array")
  }

  return (root) => {
    // walk the path given the next object/array and the step along the path
    function walk(container, step) {
      // check we have a valid container
      if (!container || !(typeof container === "object")) {
        throw new TypeError(`get of path '${path.join('.')}' failed, expecting an Object or Array at: '${path.slice(0, step)}' got: ${container}`)
      }

      // get the key within the container from the current step in the path
      var key = path[step]

      // if we've not reached the end of the path keep walking, otherwise return the value found
      return step + 1 < path.length ? walk(container[key], step + 1) : container[key]
    }

    return walk(root, 0)
  }
}
