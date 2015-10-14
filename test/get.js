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

  it("throws error if it can not walk the entire path", () => {
    expect(() => get("keyArray.1.not.here")(STATE)).to.throw(TypeError)
  })
})
