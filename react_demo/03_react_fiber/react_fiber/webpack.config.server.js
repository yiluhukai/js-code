// 对server.js中的文件进行打包
const nodeExternals = require("webpack-node-externals");
const path = require("path");
module.exports = {
    // 入口
    entry: "./server.js",
    target: "node", // 默认是web
    output: {
        filename: "server.js",
        path: path.resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
        ],
    },
    mode: "development",
    // 只打包 server.js文件，它的依赖在node_module中不处理
    externals: [nodeExternals()],
};
