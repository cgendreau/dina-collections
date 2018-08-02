/* eslint-disable no-param-reassign */

module.exports = function migratePublishRecord({ src, target, migrator }) {
  const publishCoord = migrator.getValue({
    obj: src,
    path: 'objects.Publish_Coord',
  })

  const publishRecord = migrator.getValue({
    obj: src,
    path: 'objects.Publish_Record',
  })

  migrator.setValue({
    obj: target,
    path: 'attributes.publishRecord',
    value: publishCoord === 'Y' && publishRecord === 'Y',
  })
}