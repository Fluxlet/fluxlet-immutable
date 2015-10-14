import chai, { expect } from 'chai'

import { path } from "src/path"

describe("path", () => {

  it("does not accept no arg", () => {
    expect(() => path()).to.throw(TypeError)
  })

  it("does not accept null", () => {
    expect(() => path(null)).to.throw(TypeError)
  })

  it("does not accept undefined", () => {
    expect(() => path(undefined)).to.throw(TypeError)
  })

  it("does not accept a boolean", () => {
    expect(() => path(true)).to.throw(TypeError)
    expect(() => path(false)).to.throw(TypeError)
  })

  it("does not accept a number", () => {
    expect(() => path(-1)).to.throw(TypeError)
    expect(() => path(0)).to.throw(TypeError)
    expect(() => path(1)).to.throw(TypeError)
  })

  it("does not accept a Date", () => {
    expect(() => path(new Date)).to.throw(TypeError)
  })

  it("does not accept an Object", () => {
    expect(() => path({})).to.throw(TypeError)
  })

  it("does not accept NaN or Infinity", () => {
    expect(() => path(NaN)).to.throw(TypeError)
    expect(() => path(Infinity)).to.throw(TypeError)
  })

  it("does not accept an empty string", () => {
    expect(() => path("")).to.throw(TypeError)
  })

  it("does not accept an empty array", () => {
    expect(() => path([])).to.throw(TypeError)
  })

  it("does not accept an array with an segment", () => {
    expect(() => path(["foo", "", "bar"])).to.throw(TypeError)
  })

  it("does not accept a string with an segment", () => {
    expect(() => path("foo..bar")).to.throw(TypeError)
  })

  it("does not accept a string with a preceding .", () => {
    expect(() => path(".foo")).to.throw(TypeError)
  })

  it("does not accept a string with a trailing .", () => {
    expect(() => path("foo.")).to.throw(TypeError)
  })

  it("does not accept a dot", () => {
    expect(() => path(".")).to.throw(TypeError)
  })

  it("converts a valid string path to an array split on dots", () => {
    expect(path("foo.1.bar")).to.deep.equal(["foo","1","bar"])
  })

  it("returns a valid array as is", () => {
    const array = ["foo",1,"bar"]
    expect(path(array)).to.equal(array)
  })

  it("accepts keys with dots in array path segments", () => {
    const array = ["foo.bar",1,"bar.foo"]
    expect(path(array)).to.equal(array)
  })

})
