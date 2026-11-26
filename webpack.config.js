module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        // The compiled theme is embedded as a string, byte for byte.
        test: /\.css$/,
        type: "asset/source",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  // Roam provides these at runtime (window.React, window.ReactDOM, window.Blueprint.Core);
  // the bundle must not contain its own copies.
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "@blueprintjs/core": ["Blueprint", "Core"],
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
