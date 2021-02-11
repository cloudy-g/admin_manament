const {
  override,
  fixBabelImports,
  addLessLoader
} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  // addLessLoader({
  //   lessOptions: {
  //     javascriptEnabled: true,
  //     modifyVars: {
  //       '@primary-color': '#FF0000'
  //     },
  //   }
  // }),
);