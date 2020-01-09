const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');

const devConfig = {
  mode: 'development', 

  entry: {
    index: './examples/src/index.js'
  },

	devtool: 'cheap-module-eval-source-map',

	// 起个服务器
　devServer: {
　　// 这个意思是服务器要生成在哪个文件夹下
　　contentBase:'./dist',
　　// 启动的时候自动打开浏览器，然后自动访问这个服务器地址
　　open:true,
　　// 开启Hot Module Replacement
　　hot: true
　},

	plugins: [
    // new CleanWebpackPlugin(['lib'])
		new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(commonConfig, devConfig);
