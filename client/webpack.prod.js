const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const DotenvWebpackPlugin = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new DotenvWebpackPlugin({
      path: "./.env.prod",
    }),
    new CleanWebpackPlugin({
      verbose: true,
      filename: "index_bundle.js",
    }),
  ],
});
