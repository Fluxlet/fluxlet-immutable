import chai, { expect } from 'chai'
import { spy } from "sinon"
import sinonChai from "sinon-chai"

import { map, mapIf, mapFrom, mapFromIf } from "src/map"

chai.use(sinonChai)

const STATE = {
  "single": [ 1, 2, 3, 4 ],
  "double": [ 2, 4, 6, 8 ],
  "singleLonger": [ 1, 2, 3, 4, 5 ],
}

describe("map", () => {

    it("calls the iteratee for each item in the array", () => {
      const iteratee = spy((item, index, state) => item)

      map(iteratee)(STATE.single, STATE)

      expect(iteratee).to.have.callCount(4)
    })

    it("returns the original array if the result has the same items", () => {
      const iteratee = n => n

      const result = map(iteratee)(STATE.single, STATE)

      expect(result).to.equal(STATE.single)
    })

    it("returns a new array if the items differ from the original", () => {
      const iteratee = n => n * 3

      const result = map(iteratee)(STATE.single, STATE)

      expect(result).to.not.equal(STATE.single)
      expect(result).to.deep.equal([ 3, 6, 9, 12 ])
    })
})

describe("mapIf", () => {

    it("calls the predicate for each item in the array", () => {
      const predicate = spy(() => true)
      const iteratee = v => v

      mapIf(predicate, iteratee)(STATE.single, STATE)

      expect(predicate).to.have.callCount(4)
    })

    it("calls the iteratee only when the predicate is true", () => {
      const predicate = n => n < 4
      const iteratee = spy(v => v)

      mapIf(predicate, iteratee)(STATE.single, STATE)

      expect(iteratee).to.have.callCount(3)
    })

    it("returns the original item if the predicate is false", () => {
      const predicate = n => n % 2 === 0
      const iteratee = spy(n => n * 10)

      const result = mapIf(predicate, iteratee)(STATE.single, STATE)

      expect(result).to.deep.equal([ 1, 20, 3, 40 ])
    })

    it("returns the original array if the result has the same items", () => {
      const predicate = n => true
      const iteratee = n => n

      const result = mapIf(predicate, iteratee)(STATE.single, STATE)

      expect(result).to.equal(STATE.single)
    })
})

describe("mapFrom", () => {

    it("calls the iteratee for each item in the source array", () => {
      const iteratee = spy((item, index, state) => item)

      mapFrom("singleLonger", iteratee)(STATE.double, STATE)

      expect(iteratee).to.have.callCount(5)
    })

    it("returns the original target if the result has the same items", () => {
      const iteratee = n => n * 2

      const result = mapFrom("single", iteratee)(STATE.double, STATE)

      expect(result).to.equal(STATE.double)
    })

    it("returns a new array if the items differ from the original target", () => {
      const iteratee = n => n * 3

      const result = mapFrom("single", iteratee)(STATE.double, STATE)

      expect(result).to.not.equal(STATE.double)
      expect(result).to.deep.equal([ 3, 6, 9, 12 ])
    })
})
