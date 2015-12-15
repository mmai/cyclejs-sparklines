module.exports = {
  // cache: false,
  entry: `./demo.js`,
  output: {
    path: __dirname,
    publicPath: `/`,
    filename: `demo.build.js`,
  },
  module: {
    loaders: [{test: /\.jsx?$/, loader: `babel-loader`}],
  },
  resolve: {
    extensions: [``, `.js`, `.jsx`],
  },
  plugins: [],
}
