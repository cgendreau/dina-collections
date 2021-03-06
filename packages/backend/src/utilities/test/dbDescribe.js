const config = require('../../apps/test/config')

module.exports = function dbDescribe(testName, ...rest) {
  if (config.test.runDbTests) {
    return describe(testName, ...rest)
  }

  return describe(testName, () => {
    it('Does not run when DB_TESTS not set to true', () => {
      expect(1).toBe(1)
    })
  })
}
