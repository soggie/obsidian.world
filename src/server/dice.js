// Rolls 3d6 and outputs roll outcome.
//
// attr = either "trait", "edge" or "mastery"
// resmod = modifier applied to result, from -3 to +3, can be an array
// impmod = modifier applied to impact, from -3 to +3, can be an array
// pos = either "dangerous", "balanced", or "dominant"
// rand = a custom randomisation function that will be called 3 times
// 
// returns {
//   outcome: 0 (miss), 1 (weak hit), 2 (full hit), 3 (crit hit)
//   outcomeStr: miss, weak hit, full hit, or crit hit
//   rolled: an array of the actual rolled numbers, sorted from low to high
//   result: the natural result rolled
//   impact: the natural impact rolled
//   picked: {
//     low: the low die chosen
//     high: the high die chosen
//   }
//   resultMod: the modifier applied to result
//   impactMod: the modifier applied to impact
//   resultTotal: the final result number
//   impactTotal: the final impact number
// }
export const dice = (attr, pos, resmod, impmod, rand) => {
  attr = `${attr}`
  pos = `${pos}`

  if (!Number.isInteger(resmod) || resmod < -3 || resmod > 3) {
    return Promise.reject(`Expecting resmod to be a number between -3 to +3, got ${resmod} instead`)
  }

  if (!Number.isInteger(impmod) || impmod < -3 || impmod > 3) {
    return Promise.reject(`Expecting impmod to be a number between -3 to +3, got ${impmod} instead`)
  }

  if (['trait', 'edge', 'mastery'].indexOf(attr.toLowerCase()) === -1) {
    return Promise.reject(`Expecting attr to be trait, edge or mastery, got ${attr} instead`)
  }

  if (['dangerous', 'balanced', 'dominant'].indexOf(pos.toLowerCase()) === -1) {
    return Promise.reject(`Expecting pos to be dangerous, balanced or dominant, got ${pos} instead`)
  }

  if (!rand || typeof rand !== 'function') {
    rand = () => Math.round(Math.random() * 5 + 1)
  }

  const roll = [
    rand(),
    rand(),
    rand()
  ].sort()

  let picked = null
  switch (pos) {
    case 'dangerous':
      picked = [roll[0], roll[1]]
      break

    case 'balanced':
      picked = [roll[0], roll[2]]
      break

    case 'dominant':
      picked = [roll[1], roll[2]]
      break
  }

  const result = picked.reduce((a, b) => a + b)
  const impact = (attr === 'trait') ? roll[0] : ((attr === 'edge') ? roll[1] : roll[2])
  let outcome = 0

  if (result + resmod < 7) {
    outcome = 0 // miss
  } else if (impact + impmod <= 3) {
    outcome = 1 // weak hit
  } else if (impact + impmod >= 6) {
    outcome = 3 // crit hit
  } else {
    outcome = 2 // full hit
  }

  // Interpret the return results
  return Promise.resolve({
    outcome: outcome,
    outcomeStr: ['miss', 'weak hit', 'full hit', 'crit hit'][outcome],
    rolled: roll,
    result: result,
    impact: impact,
    picked: {
      low: picked[0],
      high: picked[1]
    },
    resultMod: resmod,
    impactMod: impmod,
    resultTotal: result + resmod,
    impactTotal: impact + impmod
  })
}