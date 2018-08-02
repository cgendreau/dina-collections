const { getTestData } = require('../testData')

const compareItemToRes = (item, res) => {
  expect(item.id).toEqual(res.id)
  expect(item.attributes).toEqual(res.attributes)
}

module.exports = function testGetOneWhere({ config, setupModel }) {
  describe('getOneWhere', () => {
    describe('Added in decending order', () => {
      let model

      const firstItem = getTestData('itemPersonWithId', 0)
      const secondItem = getTestData('itemPersonWithId', 1)

      beforeAll(() => {
        return setupModel({ config }).then(createdModel => {
          model = createdModel
          return model.create({ allowId: true, item: firstItem }).then(() => {
            return model.create({ allowId: true, item: secondItem })
          })
        })
      })

      it('returns one doc when where is empty object. In default decending order', () => {
        return model.getOneWhere().then(({ item }) => {
          compareItemToRes(item, firstItem)
        })
      })
    })
    describe('Added in acending order', () => {
      let model
      const firstItem = getTestData('itemPersonWithId', 0)
      const secondItem = getTestData('itemPersonWithId', 1)

      beforeAll(() => {
        return setupModel({ config }).then(createdModel => {
          model = createdModel
          return model.create({ allowId: true, item: secondItem }).then(() => {
            return model.create({ allowId: true, item: firstItem })
          })
        })
      })

      it('returns one doc when where is empty object. In default decending order', () => {
        return model.getOneWhere({}).then(({ item }) => {
          compareItemToRes(item, firstItem)
        })
      })
    })
  })
}