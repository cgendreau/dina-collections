const getLocalPackageVersion = require('./getLocalPackageVersion')

module.exports = function captureArgString() {
  const inputArgs = process.argv.slice(3)
  const args = []

  inputArgs.forEach(arg => {
    if (arg === '--includeTag') {
      args.push('-t')
      args.push(getLocalPackageVersion())
    } else {
      args.push(arg)
    }
  })

  return args.join(' ')
}
