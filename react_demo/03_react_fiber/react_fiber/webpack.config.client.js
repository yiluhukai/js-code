// 客户端打包代码
const path = require("path");
module.exports = {
    // 入口
    entry: "./src/index.js",
    target: "web", // 默认是web
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
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
    devtool: "source-map",
};
