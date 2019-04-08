const rnManifestDll = require('../index');
const babel = require('babel-core');

const example = `
  var React = require("react");
  var ReactNative = require("react-native");
`;

it('transform manifest', () => {
  const {code} = babel.transform(example, {
    plugins: [
      [
        rnManifestDll,
        {
          manifeshFilePath: './example/TesterApp/manifest.json',
        },
      ],
    ],
  });
  expect(code).toMatchSnapshot();
});
