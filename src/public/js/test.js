const a = async function () {
  return await b()
}

const b = function () {
  return Promise.resolve(true)
}

a()
