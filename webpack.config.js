const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const dist = path.resolve(__dirname, './dist/client');
console.log('webpack location: ', dist);

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, 'client/index.tsx'),
    // ,  other chunks
    // bundle_login: path.resolve(__dirname, 'app/index.login.tsx'),
    // bundle_bearer: path.resolve(__dirname, 'app/index.bearer.tsx')
  },
  output: {
    path: dist,
    filename: '[name].js',
    // filename: '[name].[hash].js'
  },
  devtool: 'source-map',
  devServer: {
    proxy: {
      '/graphql': 'http://localhost:3000',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      // { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      // { test: /\.(png|svg)$/, loader: 'url-loader?limit=100000' },
      // { test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery' },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'assets/',
          to: 'assets/',
        },
        {
          from: 'icons/**.*',
          to: '[name].[ext]',
        },
        {
          from: 'robots933456.txt',
          to: 'robots933456.txt',
        },
        {
          from: 'robots933456.txt',
          to: 'robots433456.txt',
        },
        {
          from: 'robots933456.txt',
          to: 'robots.txt',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Application title',
      template: './client/index.tmpl.html',
      filename: './index.html',
      chunks: ['bundle'],
    }),
    // ,  other chunks ...
    // new HtmlWebpackPlugin({
    //   title: 'Bloomberg Login',
    //   template: './app/Login.tmpl.html',
    //   filename: './Login.html',
    //   chunks: ['bundle_login']
    // })
    // ,  global namespace includes ...
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // })
  ],
};
