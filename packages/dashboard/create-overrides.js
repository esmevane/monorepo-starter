// Referenced from:
// - https://github.com/L-E-G/simulator/blob/e04e6dd855b7b8c30ad82847deba5a6e851c4b4a/gui/config-overrides.js
//
// Via github issue:
// - https://github.com/ballercat/wasm-loader/issues/3
//
// Related blog post:
// - https://prestonrichey.com/blog/react-rust-wasm/
//
const path = require("path")
const { override, babelInclude } = require("customize-cra")

const appendWasm = require("./append-wasm")

const resolve = path.resolve.bind(null, __dirname)
const src = resolve("src")
const packages = resolve("../")

module.exports = function createOverrides() {
  return (config, env) => {
    const wasm = appendWasm(config)
    const babel = override(babelInclude([src, packages]))

    return Object.assign(wasm, babel(config, env))
  }
}
