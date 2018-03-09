var path = require('path');

module.exports = {
  entry: {
    timeline: [
      path.join(__dirname, './src/timeline'),
    ]
  },
  output: {
    publicPath: '',
    path: path.join(__dirname, 'dist/'),
    filename: '[name].js',
    library: 'timeline',
    libraryTarget: 'umd'
  },
  devtool: ' source-map'
};
