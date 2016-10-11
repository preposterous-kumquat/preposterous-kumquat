var path = require('path');
var webpack = require('webpack');

module.exports = {
  watchOptions: {
    poll: true
  },
  entry: './client/app.jsx',
  output: {
    path: __dirname + '/client', 
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['latest', 'react', 'stage-0']
        }
      }
    ]
  }
};


