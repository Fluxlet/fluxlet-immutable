import { cloneAndSet } from "./clone"

export function update(path, value) {
    if (path && path.split) {
        path = path.split('.')
    }

    if (!path || !path.length || !path.slice) {
        throw new TypeError("path should be a non-empty String or Array")
    }

    var getValue = typeof value === "function" ? value : () => value

    return (root) => {
        function doUpdate(container, idx) {
            if (!container || !(typeof container === "object")) {
                throw new TypeError(`update of path '${path.join('.')}' failed, expecting an Object or Array at: '${path.slice(0, idx)}' got: ${container}`)
            }

            var key = path[idx]
            var value = idx + 1 < path.length ? doUpdate(container[key], idx + 1) : getValue(container[key], root)

            return value !== container[key] ? cloneAndSet(container, key, value) : container
        }

        return doUpdate(root, 0)
    }
}
