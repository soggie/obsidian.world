// Rolls 3d6 and outputs roll outcome.
//
// pos - -1 = dangerous, 0 = balanced, 1 = dominant
// mod - -1 to +3
// rand - custom randomisation function, must return a number between 1 and 6
// returns 0 (miss), 1 (weak hit), 2 (full hit), 3 (crit hit)
export const dice = (pos, mod, rand) => {
  if (!Number.isInteger(pos) || pos < -1 || pos > 1) {
    return Promise.reject(`pos parameter (actual value: ${pos}) expecting a value of -1, 0 or 1`)
  }

  if (!Number.isInteger(mod) || mod < -1 || mod > 3) {
    return Promise.reject(`mod parameter (actual value: ${mod}) expecting a value of -1, 0, 1, 2 or 3`)
  }

  if (!rand || typeof rand !== 'function') {
    rand = () => Math.round(Math.random() * 5 + 1)
  }

  // Roll 3d6 and sort them
  const roll = [
    rand(),
    rand(),
    rand()
  ].sort()

  let result = 0
  let impact = 0
  switch (pos) {
    case -1:
      result = roll[0] + roll[1] + mod
      impact = roll[2]
      break

    case 0:
      result = roll[0] + roll[2] + mod
      impact = roll[1]
      break

    case 1:
      result = roll[1] + roll[2] + mod
      impact = roll[0]
      break
  }

  if (result < 7) {
    return Promise.resolve(0)
  }

  if (impact <= 3) {
    return Promise.resolve(1)
  }

  if (impact === 6) {
    return Promise.resolve(3)
  }

  return Promise.resolve(2)
}
