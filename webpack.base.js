var webpack = require("webpack");
var path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry:{
        index:["./src/index.js"],
        vendor:['vue']
    },
    output: {
        path:__dirname + '/build/',
        publicPath: 'build/',
        filename: '[name].js',
        chunkFilename:'[name].js'
    },
    resolve:{
        modules:[
            path.resolve(__dirname,'src'),
            path.resolve(__dirname,'node_modules')
        ],
        extensions: [".vue",".js",".json"]
    },
     module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass"> 
                        }
                    }
                }
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/, //node_modules 文件夹除外
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
                
            }, {
                test: /\.scss$/, 
                use: ExtractTextPlugin.extract({
                    use: "css-loader!resolve-url-loader!ruby-sass-loader?compass=1",
                    publicPath:"./"//如果没有定义，图片资源就会默认使用output的publicPath
                }),
                
            },
           
            {
                test: /\.(png|jpg|gif|svg)$/, //引入css文件中大于8192的图片文件
                use: 'file-loader'
            }
        ]
    }
}