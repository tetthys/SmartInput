// tsup.config.cjs
const { defineConfig } = require("tsup");

module.exports = defineConfig({
  entry: ["src/index.jsx"],
  format: ["esm", "cjs"],
  dts: false,
  sourcemap: true,
  clean: true,
  splitting: false,
  external: ["react", "react-dom"],
});
