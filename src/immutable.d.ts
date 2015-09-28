// NOTE: This is work in progress and mainly acts as formal definition of the utility functions,
// it may require some tweaking for real use in TypeScript code.

declare function update<S, V>(path: string|string[], value: V|((current: V, state: S) => V)): (state: S) => S

declare function cloneAndSet<S>(container: S, key: string|number, value: any): S

declare function chain<S>(...fns:((state: S) => S)[]): (state: S) => S

declare function freeze<S>(value: S): S

declare function deepFreeze<S>(value: S): S

declare var enableFreeze: boolean
