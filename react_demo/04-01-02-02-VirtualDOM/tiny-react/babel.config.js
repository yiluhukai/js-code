module.exports = {
    presets: [
        [
            "@babel/preset-react",
            {
                pragma: "TinyReact.createElement",
                // default pragma is React.createElement (only in classic runtime)
            },
        ],
    ],
};
