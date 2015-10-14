// # path
//
//     (string|array) -> array<string|number>
//
// Return a valid path array, given a string or array.
// A string will be split on dots '.' into an array.
// The array will be validated to ensure it is not empty, and that all segments
// are strings or numbers
//
// Throws a TypeError should something be amiss.
//
export function path(path) {

    if (path && typeof path === 'string') {
      path = path.split('.')
    }

    if (!path || !Array.isArray(path) || !path.length) {
      throw new TypeError(`invalid path, expecting a non-empty String or Array: ${path}`)
    }

    // Validate the path and fail early
    path.forEach(key => {
      if (key === "" || (typeof key !== 'string' && typeof key !== 'number')) {
        throw new TypeError(`invalid path, expecting only non-empty Strings or Numbers within the path: ${path.join('.')}`)
      }
    })

    return path
}
