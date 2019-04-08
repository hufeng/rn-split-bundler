/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */

'use strict';
const fs = require('fs');
const {relative, join} = require('path');
const crypto = require('crypto');

//rootDir
const projectRoot = process.cwd();
console.log('prjRoot=>', projectRoot);
const nodeModulesPath = join(projectRoot, 'node_modules');

function createModuleIdFactory() {
  const fileToIdMap = new Map();
  process.on('exit', () => {
    let buffer = [];
    for (let [moduleName, modulePath] of global.__vendorMap) {
      buffer.push(`"${moduleName}":${fileToIdMap.get(modulePath)}`);
    }
    for (let [modulePath, moduleId] of fileToIdMap) {
      if (modulePath.includes('node_modules') && modulePath.endsWith('.js')) {
        const relativePath = relative(nodeModulesPath, modulePath);
        buffer.push(`"${relativePath}":${moduleId}`);
      }
    }
    fs.writeFileSync(
      `/${projectRoot}/manifest.json`,
      '{' + buffer.join(',\n') + '}',
    );
  });

  return path => {
    let id = fileToIdMap.get(path);
    if (typeof id !== 'number') {
      console.log('relave->', path, projectRoot, relative(projectRoot, path));
      const subHashStr = crypto
        .createHash('md5')
        .update(relative(projectRoot, path))
        .digest('hex')
        .substring(0, 8);
      id = parseInt(subHashStr, 16);
      fileToIdMap.set(path, id);
    }
    console.log(
      'createModuleIdFactory:createModuleId->' + path + ' :-> id-> ' + id,
    );
    return id;
  };
}

//expose
module.exports = createModuleIdFactory;
