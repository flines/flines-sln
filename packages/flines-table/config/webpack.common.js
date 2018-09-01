const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
});

const copyStatic = new CopyWebpackPlugin([{
    from: path.join(__dirname, '../dist/**/*'),
    to: path.join(__dirname, '../../flines-server/public')
}]);

module.exports = {
  entry: {
    table: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../lib'),
    library: 'flines-table-widget',
    libraryTarget: "umd"

  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [extractSass, copyStatic],
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"],
    alias: {
      "root": path.resolve(__dirname, "src")
    }
  }
};
