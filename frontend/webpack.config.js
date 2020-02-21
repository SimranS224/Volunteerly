var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules"]
  },
  
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/react",
            {
              plugins: ["@babel/plugin-proposal-class-properties"]
            }
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  devServer: {
    historyApiFallback: true
  },
  externals: {
    config: JSON.stringify({
      apiUrl: "http://localhost:8000"
    })
  }
};
