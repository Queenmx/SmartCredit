var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');
const paths = require('./paths');

// DefinePlugin 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。
var definePluginConfig = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('development')
    },
    '__PROD__': JSON.stringify('dev')
});

// 将css提取成单独文件.
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "assets/css/[name].[contenthash].css",
    // disable: process.env.NODE_ENV === "development" // true: 禁用，这是css在当前页面的<style></style>中. 如果为false: 启用，则单独生成css文件. 默认为false.
});

const extractCss = new ExtractTextPlugin({
    // filename: "assets/css/[contenthash].css", // 输出到assets/css/目录下.
    filename: "assets/css/[name].[contenthash].css", // 输出到assets/css/目录下.
    // disable: process.env.NODE_ENV === "development" // true: 禁用，这是css在当前页面的<style></style>中. 如果为false: 启用，则单独生成css文件. 默认为false.
});

module.exports={
		entry: {
            main: ['whatwg-fetch', './src/entry.js'],
             vendor: [
	            'react',
	            'react-dom',
	            //'redux',
	           // 'react-redux',
	            'react-router',
	            //'immutable',
	            //'antd',
	        ]
        },
         output: {
            filename: 'assets/js/[name].[chunkhash].js', // 输出到assets/js/目录下
            path: paths.DIST_PATH, // 输出路径
            /* 对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项 */
            /* 如果指定了一个错误的值，则在加载这些资源时会收到 404 错误。 */
            publicPath: paths.DEV_WWW_URL // 一般都设置一个url否则去掉这项.
        },
        /* webpack-dev-server */
        devServer: {
            // contentBase: path.join(__dirname, "../dist"),
            contentBase: paths.DIST_PATH,
            compress: true,
            port: 8009,
            historyApiFallback: true
        },
        /* 设置模块如何解析 */
        resolve:  {
            /* 自动解析确定的扩展。默认值为：extensions: [".js", ".json"] */
            extensions: [".js", ".jsx", ".json", ".scss", ".css"] // 在js中不用写前面所列出的文件后缀, 例如：1.scss就可以去掉.scss了.
        },
        
         module: {
         	 rules: [
         	  // css.
	            /*{
	                test: /\.css$/,
	                use: extractCss.extract({
	                    use: [
	                        {
	                            loader: 'css-loader?sourceMap',
	                            // options:{
	                            //     minimize: true // css压缩
	                            // }
	                        },
	                         {loader: 'postcss-loader'}
	                    ]
	                })
	            },*/
	           
	           
	           {
	           	test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader?sourceMap',
                        options: {
                           // importLoaders: 1,
                           minimize: true // css压缩
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
	           },
	           
	           
	            // sass.
	            {
	                test: /\.scss$/,
	                use: extractSass.extract({
	                    use: [
	                        {
	                            loader: "css-loader?sourceMap",
//	                            options:{
//	                                minimize: true // css压缩
//	                            }
	                        },
	                        // {loader: "sass-loader"}
	                        {loader: "sass-loader?sourceMap&includePaths[]=" + path.resolve(__dirname, "../node_modules/compass-mixins/lib")}
	                    ]
	                })
	            },
	             // file-loader(将项目目录下assets/images/的目录结构及文件拷贝到输出目录下)
	            {
	                test: /\.(jpe?g|png|gif)(\?v=\d+\.\d+\.\d+)?$/,
	
	                /* 不设置publicPath时默认使用output中的publicPath */
	                // use:  "file-loader?name=[hash].[name].[ext]&publicPath=assets/images/&outputPath=assets/images/"
	                // use:  "file-loader?name=[hash].[name].[ext]&publicPath=http://hl.webpack-office-case.com/&outputPath=assets/images/"
	                // use:  "file-loader?name=[hash].[name].[ext]&outputPath=assets/images/"
	                use:  "file-loader?name=[hash].[ext]&outputPath=assets/images/"
	            },
	             // js.
	            {
	                test: /\.js$/,
	                exclude: /node_modules/,
	                use: [
	                    {loader: 'babel-loader'},
	                    //{loader: 'eslint-loader'}
	                ]
	            },
         	 ]
         },
         
    	/* 插件配置 */
	    plugins: [
	     	// source map(方便排查、定位javascript问题)
	        new webpack.SourceMapDevToolPlugin({
	            filename: 'map/[name].js.map', // 输出到map目录下
	            exclude: ['vendor.js'] // 排除vendor.js
	        }),
	        // DefinePlugin.
        definePluginConfig,
        // js压缩.
//      new UglifyJSPlugin({
//          compress: {
//              warnings: false,
//              // drop_console: true
//          },
//          output: {
//              comments: false
//          },
//      }),
		// 提取成单独的css文件.
        extractSass,
        extractCss,

        // 生成html.
        new HtmlWebpackPlugin({
            title: '万融汇',
            template: './index.html',
        }),

        // 公共文件提取.
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }),
	    
	    ]
         
}