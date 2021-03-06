'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLog = require('../../log');

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var _require2 = require('./modifyRelationshipResources'),
    modifyRelationshipResources = _require2.modifyRelationshipResources;

var _require3 = require('./createWithRelationships'),
    createWithRelationships = _require3.createWithRelationships;

var dep = new Dependor({
  createWithRelationships: createWithRelationships,
  modifyRelationshipResources: modifyRelationshipResources
});

var defaultLog = createLog('common:jsonApiClient:recursiveCreate');

function recursiveCreate() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      item = _ref.item,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? defaultLog : _ref$log,
      openApiClient = _ref.openApiClient,
      resourcesToModify = _ref.resourcesToModify,
      resourceType = _ref.resourceType;

  return _promise2.default.resolve().then(function () {
    if (!openApiClient) {
      throw new Error('provide openApiClient');
    }

    if (!item) {
      throw new Error('item is required');
    }

    var id = item.id,
        relationships = item.relationships,
        type = item.type;


    if (!type) {
      throw new Error('item type is required');
    }

    if (id) {
      throw new Error('id not allowed');
    }

    if (!resourceType) {
      throw new Error('resourceType is required');
    }

    if (resourceType !== type) {
      throw new Error('wrong item type: ' + type + ' for resourceType: ' + resourceType);
    }

    log.debug('recursiveCreate: start', item);

    return dep.modifyRelationshipResources({
      log: log.scope(),
      openApiClient: openApiClient,
      relationships: relationships,
      resourcesToModify: resourcesToModify
    }).then(function (updatedRelationships) {
      var itemWithUpdatedRelationships = (0, _extends3.default)({}, item, {
        relationships: updatedRelationships
      });
      log.debug('relationship resources updated. Item with updated relationships:', itemWithUpdatedRelationships);
      return dep.createWithRelationships({
        item: itemWithUpdatedRelationships,
        log: log.scope(),
        openApiClient: openApiClient,
        resourcesToModify: resourcesToModify
      }).then(function (result) {
        log.debug('recursiveCreate: done', result);
        return result;
      });
    });
  });
}

module.exports = {
  dep: dep,
  recursiveCreate: recursiveCreate
};