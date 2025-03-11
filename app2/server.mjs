// @ts-check
import express from "express";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackClientConfig from "./webpack.config.mjs";
import fs from "fs";

const app = express();
const port = 3001;

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const publicDir = path.join(rootDir, "public");

app.all("*", (_req, res, next) => {
  res.header("access-control-allow-origin", "*");
  next();
});

if (process.env.NODE_ENV !== "production") {
  const clientCompiler = webpack(webpackClientConfig);
  app.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: webpackClientConfig.output.publicPath,
      stats: false,
      writeToDisk: true,
    })
  );
  app.use(
    webpackHotMiddleware(clientCompiler, {
      path: "/__webpack_hmr_app2",
    })
  );
}

app.use("/static", express.static(distDir));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
