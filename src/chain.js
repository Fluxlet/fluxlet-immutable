// # chain
//
// Chain several functions, passing the result from one into the next.
// Most useful for combining several updates on a single state. Example:
//
//     chain(
//         update("foo", 1),
//         update("bar", 2)
//     )(state)
//
export function chain(...fns) {
    return fns.reduce.bind(fns, (state, fn) => fn(state))
}
