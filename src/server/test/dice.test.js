import assert from 'assert'
import test from 'ava'
import { dice } from '../../server/dice'

const stub = (a, b, c) => {
  let list = [a, b, c]
  return () => list.shift()
}

test('roll of [1,2,3], dangerous, trait, should yield a miss (0)', async t => {
  const result = await dice(-1, 0, 0, stub(1, 2, 3))
  assert.strictEqual(result, 0)
  t.pass()
})

test('roll of [3,4,5], dangerous, edge, should yield a full hit (2)', async t => {
  const result = await dice(-1, 0, 1, stub(3, 4, 5))
  assert.strictEqual(result, 2)
  t.pass()
})

test('roll of [3,4,6], dangerous, mastery, should yield a crit hit (3)', async t => {
  const result = await dice(-1, 0, 2, stub(3, 4, 6))
  assert.strictEqual(result, 3)
  t.pass()
})

test('roll of [3,3,3], dangerous +1, trait, should yield a weak hit (1)', async t => {
  const result = await dice(-1, 1, 0, stub(3, 3, 3))
  assert.strictEqual(result, 1)
  t.pass()
})

test('roll of [1,2,3], balanced, trait, should yield a miss (0)', async t => {
  const result = await dice(0, 0, 0, stub(1, 2, 3))
  assert.strictEqual(result, 0)
  t.pass()
})

test('roll of [3,3,4], balanced, trait, should yield a weak hit (1)', async t => {
  const result = await dice(0, 0, 0, stub(3, 3, 4))
  assert.strictEqual(result, 1)
  t.pass()
})

test('roll of [3,4,4], balanced, edge, should yield a full hit (2)', async t => {
  const result = await dice(0, 0, 1, stub(3, 4, 4))
  assert.strictEqual(result, 2)
  t.pass()
})

test('roll of [2,3,4], dominant, edge, should yield a weak hit (1)', async t => {
  const result = await dice(1, 0, 1, stub(2, 3, 4))
  assert.strictEqual(result, 1)
  t.pass()
})

test('roll of [2,3,3], dominant +1, mastery, should yield a weak hit (1)', async t => {
  const result = await dice(1, 1, 2, stub(2, 3, 3))
  assert.strictEqual(result, 1)
  t.pass()
})

test('if no rand provided, it should not throw an error', async t => {
  const result = await dice(1, 0, 1)
  assert.ok(result >= 0 && result <= 3)
  t.pass()
})
