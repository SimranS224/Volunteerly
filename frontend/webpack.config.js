var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
   entry: ['babel-polyfill', './src/index.jsx'],
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules"]
  },
  node: {
    fs: 'empty'
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
            },
          ]
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
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
      apiUrl: "http://localhost:8080"
    })
  }
};
