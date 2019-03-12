const path = require('path');
const webpack = require('webpack');

const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = require('html-webpack-template');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (isProd) {
  const plugins = [
    new HtmlWebpackPlugin({
      template,
      inject: false,
      mobile: true,
      title: 'Kanji Dictionary',
      baseHref: '/',
      appMountId: 'root',
    }),
    new webpack.DefinePlugin({'process.env.TARGET': JSON.stringify('web')}),
  ];

  if (isProd) {
    plugins.push(new MiniCssExtractPlugin());
  }

  return {
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          include: [
            path.resolve(__dirname, "../base/src"),
            path.resolve(__dirname, "src"),
          ],
        },
        {
          test: /\.scss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: { plugins: () => [autoprefixer] },
            },
            'sass-loader',
          ],
          include: path.resolve(__dirname, "src"),
        },
        {
          test: /\.ftl$/i,
          use: 'raw-loader',
          include: path.resolve(__dirname, "src"),
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
      alias: {
        "@ka/base": path.resolve(__dirname, "../base/src/index.ts"),
      },
    },
    optimization: {
      splitChunks: {chunks: 'all'},
    },
    plugins,
  };
};
