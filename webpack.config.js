const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    watchFiles: ['src/index.html', 'src/*.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
 module: {
   rules: [
    // {
    //     test: /\.svg$/,
    //     loader: 'svg-inline-loader'
    // },
    {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
        type: 'asset/resource'
     },
     {
       test: /\.css$/i,
       use: ['style-loader', 'css-loader'],
     },
     {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
   ],
 },
 plugins: [
    new HtmlWebpackPlugin({
        template:'./src/index.html',
        title: 'ToDo-List',
        filename: 'index.html', //relative to root of the application
        inject: 'head',
        scriptLoading:'defer'
    })
],
optimization: {
    runtimeChunk: 'single',
  },
};