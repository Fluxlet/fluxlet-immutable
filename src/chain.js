
/**
 * Chain several functions, passing the result from one into the next
 */
export function chain(...fns) {
    return fns.reduce.bind(fns, (state, fn) => fn(state))
}
