const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
const prodConfig = {
  mode: 'production', 
  
  entry: {
    index: './src/index.js'
  },

  plugins: [
    new CleanWebpackPlugin(['lib'])
  ]
}

module.exports = merge(commonConfig, prodConfig);
