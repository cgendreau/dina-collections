'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildOperationId = require('../../buildOperationId');
var createOperationSpecificQueryParams = require('../utilities/createOperationSpecificQueryParams');
var createRelationSpecification = require('../utilities/createRelationSpecification');
var fetchIncluded = require('./fetchIncluded');

module.exports = function getMany(_ref) {
  var openApiClient = _ref.openApiClient,
      resourceType = _ref.resourceType,
      userOptions = _ref.userOptions;
  var queryParams = userOptions.queryParams;

  var relationSpecification = createRelationSpecification(queryParams);

  return openApiClient.call(buildOperationId({
    operationType: 'getMany',
    resource: resourceType
  }), {
    queryParams: createOperationSpecificQueryParams({
      path: '.',
      queryParams: queryParams,
      relationSpecification: relationSpecification
    })
  }).then(function (response) {
    return fetchIncluded(response.data).then(function (included) {
      return (0, _extends3.default)({}, response, {
        included: included
      });
    });
  });
};