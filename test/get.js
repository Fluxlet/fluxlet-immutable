import chai, { expect } from 'chai'

import { get } from "src/get"

const STATE = {
  "key1": "one",
  "keyArray": [
    "A",
    "B",
    "C",
    {
      "deepKey": "ok"
    }
  ],
  "dot.here": "fine"
}

describe("get", () => {

  it("accepts a function and passes it through", () => {
    const fn = s => s.key1

    expect(get(fn)).to.equal(fn)
    expect(get(fn)(STATE)).to.equal("one")
  })

  it("returns a value given a dot separated string path", () => {
    expect(get("keyArray.3.deepKey")(STATE)).to.equal("ok")
  })

  it("returns a value given an array path", () => {
    expect(get(["keyArray", 3, "deepKey"])(STATE)).to.equal("ok")
  })

  it("accepts keys with dots only in array path", () => {
    expect(get(["dot.here"])(STATE)).to.equal("fine")
    expect(() => get("dot.here")(STATE)).to.throw(Error)
  })

  it("does not accept non function/string/array source", () => {
    expect(() => get(null)).to.throw(TypeError)
    expect(() => get()).to.throw(TypeError)
    expect(() => get(true)).to.throw(TypeError)
    expect(() => get(false)).to.throw(TypeError)
    expect(() => get(0)).to.throw(TypeError)
    expect(() => get(1)).to.throw(TypeError)
    expect(() => get(new Date)).to.throw(TypeError)
    expect(() => get({})).to.throw(TypeError)
    expect(() => get(NaN)).to.throw(TypeError)
    expect(() => get(Infinity)).to.throw(TypeError)
  })

  it("does not accept empty path", () => {
    expect(() => get("")).to.throw(TypeError)
    expect(() => get([])).to.throw(TypeError)
  })
})
