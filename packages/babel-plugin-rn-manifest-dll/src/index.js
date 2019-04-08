const {resolve} = require('path');
const log = require('debug')('@babel/plugin-rn-manifest-dll');

const isRequireExpression = (t, path) =>
  t.isIdentifier(path.node.callee, {name: 'require'});

module.exports = function(babel) {
  const {types: t} = babel;

  return {
    visitor: {
      CallExpression(path, {opts}) {
        if (!isRequireExpression(t, path)) {
          return;
        }
        const manifeshFilePath = opts.manifeshFilePath;
        log('manifeshFilePath %s', manifeshFilePath);
        const manifeshJson = require(resolve(manifeshFilePath));
        const requireModule = path.node.arguments[0].value;
        log('current require module is %s', requireModule);

        const globalModuleId = manifeshJson[`${requireModule}.js`];
        log('%s => %s', requireModule, globalModuleId);

        if (globalModuleId) {
          const replaceCallExpression = t.callExpression(
            t.identifier('qmrequire'),
            [t.numericLiteral(globalModuleId)],
          );
          path.replaceWith(replaceCallExpression);
        }
      },
    },
  };
};
