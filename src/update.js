import { path as bakePath } from "./path"
import { cloneAndSet } from "./clone"

// # update
//
// Updates part of an immutable structure, returning a new structure which reuses unchanged values.
// It takes a path to a value within the structure as a string of dot separated keys, or a array of keys.
// And a value to replace with, or a function that returns the new value.
//
// This function takes just the path and value/function, and returns a function that takes the state and
// returns a state. This makes it very convenient for use in Fluxlet actions and calculations.
//
//     (path, value) -> (state) -> state
//
// where value may be the new value or a function with the signature:
//
//     (value, state) -> value
//
// path may be a dot separate string of keys, or an array of keys.
//
// NOTE: update does not create objects/arrays as it goes, it will fail should it encounter an invalid
// container along the path.
//
// Example:
//
//     update("something.1.name", (oldName, state) => state.lower ? oldName.toLowerCase() : oldName)(state)
//     update(["key.with.dots", index, "name"], "bob")(state)
//
export function update(path, value) {
    const validPath = bakePath(path)

    // Wrap any non-function value in a function
    const getValue = typeof value === "function" ? value : () => value

    return (root) => {
        // walk the path given the next object/array and the step along the path
        function walk(container, step) {
            // check we have a valid container
            if (!container || !(typeof container === "object")) {
                throw new TypeError(`update of path '${path.join('.')}' failed, expecting an Object or Array at: '${path.slice(0, step).join('.')}' got: ${container}`)
            }

            // get the key within the container from the current step in the path
            const key = validPath[step]

            // if we've not reached the end of the path keep walking, otherwise call the value function
            // with the current value and the root object
            const value = step + 1 < validPath.length ? walk(container[key], step + 1) : getValue(container[key], root)

            // if the value is different, shallow clone the container but with a new value for the key,
            // otherwise return the container as is. The container (or clone) is returned as the value to
            // the preview doUpdate, so if this was cloned then that will be too, working it way back up to root.
            return value !== container[key] ? cloneAndSet(container, key, value) : container
        }

        // start walking from the given root and the first key in the path
        return walk(root, 0)
    }
}
