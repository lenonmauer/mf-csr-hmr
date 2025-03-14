import path from "path";
import { ModuleFederationPlugin } from "@module-federation/enhanced/webpack";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import webpack from "webpack";

const __dirname = process.cwd();

export default {
  entry: [
    "webpack-hot-middleware/client?reload=true&noInfo=true&path=http://localhost:3001/__webpack_hmr_app2",
    "./src/index.ts",
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                  dynamicImport: true,
                },
                transform: {
                  react: {
                    development: true,
                    refresh: true,
                  },
                },
              },
            },
          },
        ],
      },
    ],
  },
  mode: "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".mjs"],
  },
  optimization: {
    // runtimeChunk: "single",
  },
  output: {
    uniqueName: "app2",
    // filename: "[name]-[contenthash].js",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "auto",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      dts: false,
      shared: [
        {
          react: "19.0.0",
          "react-dom": "19.0.0",
        },
      ],
      exposes: {
        "./Button": "./src/Button.tsx",
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
};
