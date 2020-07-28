const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const DotenvWebpackPlugin = require("dotenv-webpack");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9000,
    hot: true,
  },
  plugins: [
    new DotenvWebpackPlugin({
      path: "./.env.dev",
    }),
  ],
});
