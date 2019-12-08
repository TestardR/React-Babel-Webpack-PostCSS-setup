const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: ["react-hot-loader/patch", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
        include: [path.resolve(__dirname, "src")]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        // 1. postcss-loader turns the SCSS into normal CSS.
        // 2. css-loader turns the CSS into a JS module whose default
        //    export is a string containing the CSS, while also adding
        //    the images and fonts from CSS as Webpack inputs.
        // 3. MiniCssExtractPlugin turns that string into a separate asset.
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles postCSS to CSS
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: "./postcss.config.js"
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      hash: true,
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css"
    })
  ],
  devtool: "source-map",
  devServer: {
    stats: {
      chunks: false
    }
  }
};
