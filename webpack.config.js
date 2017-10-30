
'use strict';

var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
var webpack=require("webpack");
module.exports = {
    entry: __dirname + '/src/entry.js', //唯一入口文件
    output: {
        path: __dirname + '/build', //打包后的文件存放的地方
        filename: 'build.js' //打包后输出文件的文件名
    },
    devtool:"source-map",//调试工具
    module: {
        loaders: [
//      {    
//        test: /\.js[x]$/,    
//        exclude: /node_modules/,    
//        loader: 'babel',    
//        query: {    
//            presets: ['es2015','react']  
//        }    
//    },
			{
				test:/\.js$/,
				loader:"babel-loader",
				query: {
			        presets: ['es2015','react']
			    }
			},

       		// {test:/\.jsx?$/,exclude: /node_modules/,loader: 'babel', query: {presets: ['es2015', 'react']}},//同时支持es6 react
            //{ test: /\.js$/, loader: "jsx-loader!babel-loader", include: /src/},
//          {
//				test:/\.css$/,
//				loader:"style-loader!css-loader"
//			},
            { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })},
           //{ test: /\.css$/, loader: 'style!css?modules!postcss' },
           //{ test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader')},
           	//{ test: /\.scss$/, loader:"style,css!postcss!sass"},
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
            
        ]
    },
//   postcss: [
//	        require('autoprefixer')    //调用autoprefixer插件,css3自动补全
//	    ],
//  devServer: {
//      // contentBase: './src/views'  //本地服务器所加载的页面所在的目录
//      port: 8888,
//      colors: true,  //终端中输出结果为彩色
//      historyApiFallback: true,  //不跳转
//      inline: true  //实时刷新
//  },
//  
//  plugins: [
//  	new webpack.DefinePlugin({
//		  "process.env": { 
//		     NODE_ENV: JSON.stringify("production") 
//		   }
//		}),
//      new ExtractTextPlugin('main.css'),
//      new webpack.optimize.UglifyJsPlugin({
//        compress: {
//          warnings: false
//        }
//      })
//  ]
    
    plugins: [
		  new webpack.LoaderOptionsPlugin({
		    options: {
//		      postcss: function () {
//		        return [require('autoprefixer')];
//		      },
//		      devServer: {
//		        // contentBase: './src/views'  //本地服务器所加载的页面所在的目录
//		        port: 8888,
//		        colors: true,  //终端中输出结果为彩色
//		        historyApiFallback: true,  //不跳转
//		        inline: true  //实时刷新
//		    },
		    }
		  }),
		  
//		  new webpack.DefinePlugin({
//			  "process.env": { 
//			     NODE_ENV: JSON.stringify("production") 
//			   }
//			}),
	        new ExtractTextPlugin('main.css')
//	        new webpack.optimize.UglifyJsPlugin({
//	          compress: {
//	            warnings: false
//	          }
//	        })
			]

}
