import chai, { expect } from 'chai'

import { update } from "src/update"

describe("update", () => {

    const updateTest = update(['test'], "changed")

    let state

    beforeEach(() => {
        state = {
            "key1": "one",
            "key2": "two",
            "keyObject": {
                "keyA": "here",
                "keyB": "there"
            },
            "keyArray": [
                "A",
                "B",
                "C",
                {
                    "deepKey": "ok"
                }
            ]
        }
    })

    it("accepts a value function", () => {
        const newState = update(["key1"], () => "changed")(state)
        expect(newState.key1).to.equal("changed")
    })

    it("accepts a plain value", () => {
        const newState = update(["key1"], "changed")(state)
        expect(newState.key1).to.equal("changed")
    })

    it("accepts a single segment string path", () => {
        const newState = update("key1", "changed")(state)
        expect(newState.key1).to.equal("changed")
    })

    it("accepts a multiple segment string path", () => {
        const newState = update("keyArray.3.deepKey", "changed")(state)
        expect(newState.keyArray[3].deepKey).to.equal("changed")
    })

    it("sets 1st level property and clones state given in single segment path", () => {
        const newState = update(["key1"], "changed")(state)
        expect(newState).not.to.equal(state)
        expect(newState.key1).to.equal("changed")
        expect(newState.keyObject).to.equal(state.keyObject)
        expect(newState.keyArray).to.equal(state.keyArray)
    })

    it("sets 2nd level property and clones ancestors given in two segment path", () => {
        const newState = update(["keyObject", "keyB"], "changed")(state)
        expect(newState).not.to.equal(state)
        expect(newState.keyObject).not.to.equal(state.keyObject)
        expect(newState.keyObject.keyA).to.equal(state.keyObject.keyA)
        expect(newState.keyObject.keyB).to.equal("changed")
    })

    it("sets deep property and clones ancestors", () => {
        const newState = update(["keyArray", 3, "deepKey"], "changed")(state)
        expect(newState).not.to.equal(state)
        expect(newState.keyObject).to.equal(state.keyObject)
        expect(newState.keyArray).not.to.equal(state.keyArray)
        expect(newState.keyArray[0]).to.equal(state.keyArray[0])
        expect(newState.keyArray[3]).not.to.equal(state.keyArray[3])
        expect(newState.keyArray[3].deepKey).to.equal("changed")
    })

    it("deletes a property given an undefined value", () => {
        const newState = update(["key1"], undefined)(state)
        expect(newState.key1).to.be.undefined
        expect(newState.hasOwnProperty("key1")).to.be.false
    })

    it("throws an error for an empty path", () => {
        expect(() => update([], "changed")(state)).to.throw(TypeError)
    })

    it("throws an error for a null state", () => {
        expect(() => updateTest(null)).to.throw(TypeError)
    })

    it("throws an error for an undefined state", () => {
        expect(() => updateTest(undefined)).to.throw(TypeError)
    })

    it("throws an error for a string state", () => {
        expect(() => updateTest("foo")).to.throw(TypeError)
    })

    it("throws an error for a number state", () => {
        expect(() => updateTest(10)).to.throw(TypeError)
    })

    it("throws an error for a boolean state", () => {
        expect(() => updateTest(true)).to.throw(TypeError)
    })

    it("to add missing object property", () => {
        expect(update(["nothere"], "added")({ "here": "this" }).nothere).to.equal("added")
    })

    it("to add missing array item", () => {
        expect(update([3], "added")([ "zero", "one" ])[3]).to.equal("added")
    })

    it("passes current value and root to value function", () => {
      const newState = update("keyArray.3.deepKey", (value, root) => {
          expect(value).to.equal("ok")
          expect(root).to.equal(state)
          return state.key1
      })(state)
      expect(newState.keyArray[3].deepKey).to.equal("one")
    })

    it("returns the same object if nothing changed", () => {
      const newState = update(["key1"], val => val)(state)
      expect(newState).to.equal(state)
    })
})
