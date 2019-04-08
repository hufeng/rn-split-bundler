/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */

'use strict';
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i];
    return arr2;
  } else {
    return Array.from(arr);
  }
}

const getAppendScripts = require('../../lib/getAppendScripts');
var _require = require('./helpers/js');
const isJsModule = _require.isJsModule,
  wrapModule = _require.wrapModule;

global.__vendorMap = new Map();

function plainJSBundle(entryPoint, pre, graph, options) {
  console.log('plainJSBundle@hack@entry->', entryPoint);
  const entryDepsMap = graph.dependencies.get(entryPoint).dependencies;
  for (let [moduleName, module] of entryDepsMap) {
    //如果是绝对路径就提取到vendor
    if (!moduleName.startsWith('./')) {
      console.log(
        'plainJSBundle@hack@vendor-module->',
        module.absolutePath,
        moduleName,
      );
      global.__vendorMap.set(moduleName, module.absolutePath);
    }
  }

  for (const module of graph.dependencies.values()) {
    options.createModuleId(module.path);
  }

  return []
    .concat(
      _toConsumableArray(pre),
      _toConsumableArray(graph.dependencies.values()),
      _toConsumableArray(getAppendScripts(entryPoint, graph, options)),
    )
    .filter(isJsModule)
    .filter(options.processModuleFilter)
    .map(module => wrapModule(module, options))
    .join('\n');
}

module.exports = plainJSBundle;
