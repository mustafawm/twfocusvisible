const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.resolve(__dirname, '..');
const fontRegex = /.(eot|ttf|woff|otf|woff2)$/;
const imgRegex = /.(png|jpg|gif)$/;

module.exports = (env = {}) => {
  return {
    entry: {
      main: `${rootPath}/src/app/index.tsx`,
    },

    output: {
      path: `${rootPath}/dist/`,
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      publicPath: '/',
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [`${rootPath}/src`, `${rootPath}/cypress`, 'node_modules'],
    },

    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        hash: true,
        template: `${rootPath}/src/html/index.template.html`,
      })
    ],

    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'react-svg-loader',
            },
          ],
        },
        {
          test: new RegExp(`(${fontRegex.source})|(${imgRegex.source})`),
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: (url, resourcePath) => {
                  if (imgRegex.test(resourcePath)) {
                    return `images/${url}`;
                  }
                  return `fonts/${url}`;
                },
              },
            },
          ],
        },
      ],
    },

    stats: {
      all: false,
      assets: true,
      builtAt: true,
      chunks: false,
      colors: true,
      errors: true,
      chunkOrigins: false,
      modules: true,
      maxModules: 0,
      warnings: true,
      hash: true,
      moduleTrace: false,
      errorDetails: true,
      publicPath: true,
      timings: true,
      usedExports: true,
      version: true,
      modulesSort: 'size',
      excludeAssets: /.(otf|png)$/,
    },
  };
};
