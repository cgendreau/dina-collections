const tryImport = () => {
  return import('./index')
}

describe('dataModules/placeService/reducer', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })
})