'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cloneObject = require('./utilities/cloneObject');

var _require = require('./specifications'),
    getNormalizeSpecification = _require.getNormalizeSpecification,
    getRelationshipSpecification = _require.getRelationshipSpecification;

var denormalizeItem = require('./normalize/denormalizeItem');
var resolveItemRelationshipsSync = require('./relationships/resolveItemRelationshipsSync');

module.exports = function coreToNestedSync(_ref) {
  var _ref$denormalize = _ref.denormalize,
      denormalize = _ref$denormalize === undefined ? true : _ref$denormalize,
      getItemByTypeId = _ref.getItemByTypeId,
      rawItem = _ref.item,
      _ref$resolveRelations = _ref.resolveRelationships,
      resolveRelationships = _ref$resolveRelations === undefined ? true : _ref$resolveRelations,
      type = _ref.type;

  if (!rawItem) {
    return rawItem;
  }

  var item = cloneObject(rawItem);
  var _item = item,
      id = _item.id,
      relationships = _item.relationships,
      attributes = _item.attributes;

  item = (0, _extends3.default)({}, attributes, {
    id: id
  });

  var normalizeSpecification = getNormalizeSpecification(type);

  if (denormalize && normalizeSpecification) {
    item = denormalizeItem({ item: item, normalizeSpecification: normalizeSpecification, type: type });
  }

  var relationshipSpecification = getRelationshipSpecification(type);

  if (resolveRelationships && relationshipSpecification) {
    item = resolveItemRelationshipsSync({
      coreToNestedSync: coreToNestedSync,
      getItemByTypeId: getItemByTypeId,
      item: item,
      relationships: relationships,
      relationshipSpecification: relationshipSpecification
    });
  }

  return item;
};