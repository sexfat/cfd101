const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');





module.exports = {
    entry: {
     index: './src/js/scripts.js'

},// 入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },              // 出口文件
    mode: 'production',      // 開發模式配置 development
    module: {
        rules: [{
            // 格式
            test: /\.(sass|scss|css)$/,
            //順序是由下到上 sass > css > style
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: './dist'
                }
              },
                'css-loader',
                'sass-loader'
            ],
        }]

    },             // 處裡對應模組
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./[name].css" // 產生出來的css
        }),
        new HtmlWebpackPlugin({
            chunks : ['index'],  //選擇注入資源 chunk
            inject  : 'body', //預設<body> js </body>  head or body
            template : './src/index.html',
            //來源
            filename : 'index.html',
            // 目的地
            title: '首頁'
        })
    ], // 對應的插件
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: 3000,
        // 指定首頁檔案
        index: 'index.html',
        open: true
    },         // 服務器配置
}