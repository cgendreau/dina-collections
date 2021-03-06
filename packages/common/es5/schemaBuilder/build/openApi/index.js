'use strict';

var createOpenApiInfo = require('./createOpenApiInfo');
var createOpenApiServers = require('./createOpenApiServers');
var createOpenApiTags = require('./createOpenApiTags');
var createOpenApiPaths = require('./createOpenApiPaths');
var createOpenApiComponents = require('./createOpenApiComponents');

module.exports = function createOpenApi(_ref) {
  var apis = _ref.apis,
      endpoints = _ref.endpoints,
      errors = _ref.errors,
      info = _ref.info,
      models = _ref.models,
      normalize = _ref.normalize,
      parameters = _ref.parameters,
      security = _ref.security,
      servers = _ref.servers,
      version = _ref.version;

  return {
    openapi: '3.0.0',
    info: createOpenApiInfo(info),
    servers: createOpenApiServers(servers),
    tags: createOpenApiTags({ apis: apis }),
    paths: createOpenApiPaths(endpoints),
    components: createOpenApiComponents({
      endpoints: endpoints,
      errors: errors,
      models: models,
      normalize: normalize,
      parameters: parameters,
      security: security,
      version: version
    })
  };
};