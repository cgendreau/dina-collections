const path = require('path')

const buildFileTrees = require('common/src/buildFileTrees')

const trees = [
  {
    levels: 2,
    name: 'root',
    rootRelativePath: '',
  },
  {
    levels: 2,
    name: 'src',
    rootRelativePath: './src',
  },
  {
    levels: 4,
    name: 'lib',
    rootRelativePath: './src/lib',
  },
  {
    levels: 3,
    name: 'apps',
    rootRelativePath: './src/apps',
  },
  {
    levels: 4,
    name: 'services',
    rootRelativePath: './src/services',
  },
]

const rootPath = path.join(__dirname, '../../')

buildFileTrees({
  rootPath,
  trees,
})
