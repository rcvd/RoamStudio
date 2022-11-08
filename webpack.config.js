module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: {
    react: "React",
    "chrono-node": "ChronoNode",
  },
  externalsType: "window",
  output: {
    filename: "extension.js",
    path: __dirname,
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
  mode: "production",
  // turns off warning about file size
  performance: {
    hints: false,
  },
};
