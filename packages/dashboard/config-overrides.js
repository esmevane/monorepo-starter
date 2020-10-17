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

const createOverrides = require("./create-overrides")

function appendWasm(config) {
  const wasmExtensionRegExp = /\.wasm$/

  config.resolve.extensions.push(".wasm")

  config.module.rules.forEach((rule) => {
    ;(rule.oneOf || []).forEach((oneOf) => {
      if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
        oneOf.exclude.push(wasmExtensionRegExp)
      }
    })
  })

  config.module.rules.push({
    test: wasmExtensionRegExp,
    include: path.resolve(__dirname, "src"),
    use: [{ loader: require.resolve("wasm-loader"), options: {} }],
  })

  return config
}

module.exports = function (config, env) {
  return Object.assign(
    appendWasm(config),
    override(
      babelInclude([
        /* transpile (converting to es5) code in src/ and shared component library */
        path.resolve("src"),
        path.resolve("../"),
      ]),
    )(config, env),
  )
}
