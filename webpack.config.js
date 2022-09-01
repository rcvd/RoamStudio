module.exports = {
    externals: {
        react: "React",
        "chrono-node": "ChronoNode"
    },
    externalsType: "window",
    entry: './src/index.js',
    output: {
        filename: 'extension.js',
        path: __dirname,
        library: {
            type: "module",
        }
    },
    experiments: {
        outputModule: true,
    },
    mode: 'production',
    // turns off warning about file size
    performance: {
        hints: false,
    },
};
