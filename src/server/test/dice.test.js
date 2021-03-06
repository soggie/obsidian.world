import assert from 'assert'
import test from 'ava'
import { dice } from '../../server/dice'

const stub = (a, b, c) => {
  let list = [a, b, c]
  return () => list.shift()
}

test('roll trait of [1,2,3] at dangerous should yield a miss', async t => {
  const r = await dice('trait', 'dangerous', 0, 0, stub(1, 2, 3))
  assert.strictEqual(r.outcome, 0)
  assert.equal(r.outcomeStr, 'miss')
  assert.strictEqual(r.rolled[0], 1)
  assert.strictEqual(r.rolled[1], 2)
  assert.strictEqual(r.rolled[2], 3)
  assert.strictEqual(r.result, 3)
  assert.strictEqual(r.impact, 1)
  assert.strictEqual(r.picked.low, 1)
  assert.strictEqual(r.picked.high, 2)
  assert.strictEqual(r.resultMod, 0)
  assert.strictEqual(r.impactMod, 0)
  assert.strictEqual(r.resultTotal, 3)
  assert.strictEqual(r.impactTotal, 1)
  t.pass()
})

test('roll trait of [3,4,5] at dangerous should yield a weak hit', async t => {
  const r = await dice('trait', 'dangerous', 0, 0, stub(3, 4, 5))
  assert.strictEqual(r.outcome, 1)
  assert.equal(r.outcomeStr, 'weak hit')
  assert.strictEqual(r.rolled[0], 3)
  assert.strictEqual(r.rolled[1], 4)
  assert.strictEqual(r.rolled[2], 5)
  assert.strictEqual(r.result, 7)
  assert.strictEqual(r.impact, 3)
  assert.strictEqual(r.picked.low, 3)
  assert.strictEqual(r.picked.high, 4)
  assert.strictEqual(r.resultMod, 0)
  assert.strictEqual(r.impactMod, 0)
  assert.strictEqual(r.resultTotal, 7)
  assert.strictEqual(r.impactTotal, 3)
  t.pass()
})

test('roll edge of [3,4,5] at balanced should yield a full hit', async t => {
  const r = await dice('edge', 'balanced', 0, 0, stub(3, 4, 5))
  assert.strictEqual(r.outcome, 2)
  assert.equal(r.outcomeStr, 'full hit')
  assert.strictEqual(r.rolled[0], 3)
  assert.strictEqual(r.rolled[1], 4)
  assert.strictEqual(r.rolled[2], 5)
  assert.strictEqual(r.result, 8)
  assert.strictEqual(r.impact, 4)
  assert.strictEqual(r.picked.low, 3)
  assert.strictEqual(r.picked.high, 5)
  assert.strictEqual(r.resultMod, 0)
  assert.strictEqual(r.impactMod, 0)
  assert.strictEqual(r.resultTotal, 8)
  assert.strictEqual(r.impactTotal, 4)
  t.pass()
})

test('roll edge of [1,2,6] at dominant should yield a weak hit', async t => {
  const r = await dice('edge', 'dominant', 0, 0, stub(1, 2, 6))
  assert.strictEqual(r.outcome, 1)
  assert.equal(r.outcomeStr, 'weak hit')
  assert.strictEqual(r.rolled[0], 1)
  assert.strictEqual(r.rolled[1], 2)
  assert.strictEqual(r.rolled[2], 6)
  assert.strictEqual(r.result, 8)
  assert.strictEqual(r.impact, 2)
  assert.strictEqual(r.picked.low, 2)
  assert.strictEqual(r.picked.high, 6)
  assert.strictEqual(r.resultMod, 0)
  assert.strictEqual(r.impactMod, 0)
  assert.strictEqual(r.resultTotal, 8)
  assert.strictEqual(r.impactTotal, 2)
  t.pass()
})

test('roll mastery of [1,2,6] at dominant should yield a crit hit', async t => {
  const r = await dice('mastery', 'dominant', 0, 0, stub(1, 2, 6))
  assert.strictEqual(r.outcome, 3)
  assert.equal(r.outcomeStr, 'crit hit')
  assert.strictEqual(r.rolled[0], 1)
  assert.strictEqual(r.rolled[1], 2)
  assert.strictEqual(r.rolled[2], 6)
  assert.strictEqual(r.result, 8)
  assert.strictEqual(r.impact, 6)
  assert.strictEqual(r.picked.low, 2)
  assert.strictEqual(r.picked.high, 6)
  assert.strictEqual(r.resultMod, 0)
  assert.strictEqual(r.impactMod, 0)
  assert.strictEqual(r.resultTotal, 8)
  assert.strictEqual(r.impactTotal, 6)
  t.pass()
})

test('roll edge of [1,2,6] at dominant +2 impact should yield a full hit', async t => {
  const r = await dice('edge', 'dominant', 0, 2, stub(1, 2, 6))
  assert.strictEqual(r.outcome, 2)
  assert.equal(r.outcomeStr, 'full hit')
  assert.strictEqual(r.rolled[0], 1)
  assert.strictEqual(r.rolled[1], 2)
  assert.strictEqual(r.rolled[2], 6)
  assert.strictEqual(r.result, 8)
  assert.strictEqual(r.impact, 2)
  assert.strictEqual(r.picked.low, 2)
  assert.strictEqual(r.picked.high, 6)
  assert.strictEqual(r.resultMod, 0)
  assert.strictEqual(r.impactMod, 2)
  assert.strictEqual(r.resultTotal, 8)
  assert.strictEqual(r.impactTotal, 4)
  t.pass()
})

test('roll trait of [3,3,3] at dangerous +1 should yield a weak hit', async t => {
  const r = await dice('trait', 'dangerous', 1, 0, stub(3, 3, 3))
  assert.strictEqual(r.outcome, 1)
  assert.equal(r.outcomeStr, 'weak hit')
  assert.strictEqual(r.rolled[0], 3)
  assert.strictEqual(r.rolled[1], 3)
  assert.strictEqual(r.rolled[2], 3)
  assert.strictEqual(r.result, 6)
  assert.strictEqual(r.impact, 3)
  assert.strictEqual(r.picked.low, 3)
  assert.strictEqual(r.picked.high, 3)
  assert.strictEqual(r.resultMod, 1)
  assert.strictEqual(r.impactMod, 0)
  assert.strictEqual(r.resultTotal, 7)
  assert.strictEqual(r.impactTotal, 3)
  t.pass()
})

test('roll trait of [3,4,5] at dangerous -1 should yield a miss', async t => {
  const r = await dice('trait', 'dangerous', -1, 0, stub(3, 4, 5))
  assert.strictEqual(r.outcome, 0)
  assert.equal(r.outcomeStr, 'miss')
  assert.strictEqual(r.rolled[0], 3)
  assert.strictEqual(r.rolled[1], 4)
  assert.strictEqual(r.rolled[2], 5)
  assert.strictEqual(r.result, 7)
  assert.strictEqual(r.impact, 3)
  assert.strictEqual(r.picked.low, 3)
  assert.strictEqual(r.picked.high, 4)
  assert.strictEqual(r.resultMod, -1)
  assert.strictEqual(r.impactMod, 0)
  assert.strictEqual(r.resultTotal, 6)
  assert.strictEqual(r.impactTotal, 3)
  t.pass()
})

test('roll edge of [1,4,6] at dominant -1 impact should yield a weak hit', async t => {
  const r = await dice('edge', 'dominant', 0, -1, stub(1, 4, 6))
  assert.strictEqual(r.outcome, 1)
  assert.equal(r.outcomeStr, 'weak hit')
  assert.strictEqual(r.rolled[0], 1)
  assert.strictEqual(r.rolled[1], 4)
  assert.strictEqual(r.rolled[2], 6)
  assert.strictEqual(r.result, 10)
  assert.strictEqual(r.impact, 4)
  assert.strictEqual(r.picked.low, 4)
  assert.strictEqual(r.picked.high, 6)
  assert.strictEqual(r.resultMod, 0)
  assert.strictEqual(r.impactMod, -1)
  assert.strictEqual(r.resultTotal, 10)
  assert.strictEqual(r.impactTotal, 3)
  t.pass()
})