import { get } from "./get"

// # map
//
// Yet another map implementation. Although this one is specifically designed
// to compliment the update function.
//
//     (iteratee) -> (array, state) -> array
//
// where iteratee is the fn called on every item in the array
//
//     (item, index, state) -> item
//
// but instead of getting the list in the third argument you get the whole
// state passed in from update.
//
// The major distinction between this and the usual map is that it returns
// the same array if all the returned items are the same.
//
// Example:
//
//     const state = {
//         numbers: [1,2,3,4],
//         multiplier: 2
//     }
//
//     const multiply = (n, x, {multiplier}) => n * multiplier
//
//     update("numbers", map(multiply))(state)
//
// This returns a new state with a new numbers array that has all items
// multiplied by 2
//
export function map(iteratee) {
  return (array, state) => doMap(iteratee, array, array, state)
}

// # mapIf
//
//     (predicate, iteratee) -> (array, state) -> array
//
// Works very similar to map, only takes a predicate which is checked against
// each item, if it returns true then the iteratee is called, otherwise the
// item is passed through untouched.
//
// The predicate has the signature:
//
//     (item, index, state) -> boolean
//
// Example:
//
//     const state = {
//         numbers: [-1,2,-3,4],
//         multiplier: 2
//     }
//
//     const positive = n => n > 0
//     const multiply = (n, x, {multiplier}) => n * multiplier
//
//     update("numbers", mapIf(positive, multiply))(state)
//
// All positive numbers will be multiplied by 2, negative numbers are unchanged
//
export function mapIf(predicate, iteratee) {
  return (array, state) => doMap(iteratee, array, array, state, predicate)
}

// # mapFrom
//
//     (source, iteratee) -> (array, state) -> array
//
// Useful for transforming an array from elsewhere in the state. The source
// arg can be a path to an array within the state, like the path for update:
//
//     "path.1.to.array" or ["path", 1, "to", "array"]
//
// or a function that supplies the array, the fn is passed the state:
//
//     (state) -> array
//
// The iteratee function is the as map.
//
// Like map, this will not replace the target array if its items remain the same.
//
// Example:
//
//     const state = {
//         numbers: [1,2,3,4],
//         multiplier: 2,
//         results: []
//     }
//
//     const multiply = (n, x, {multiplier}) => n * multiplier
//
//     update("results", mapFrom("numbers", multiply))(state)
//
// A new state is returned with a new results array containing the
//
export function mapFrom(source, iteratee) {
  return (target, state) => doMap(iteratee, get(source)(state), target, state)
}

function doMap(iteratee, source, target, state, predicate) {
  let result

  source.forEach((item, index) => {
    const newItem = !predicate || predicate(item, index, state)
        ? iteratee(item, index, state)
        : item

    // On the first different new item construct the resultant array from
    // a slice of the target array up to the current index
    if (!result && newItem !== target[index]) {
      result = target.slice(0, index);
    }

    // Add new item to the new result array if we have one
    if (result) {
      result.push(newItem)
    }
  })

  // If got no different items from the iteratee then result will be
  // undefined so we return the target
  return result || target
}
