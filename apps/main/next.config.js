const glob = require("glob");
const path = require("path");
const fs = require("fs");
const transpileModules = require("next-transpile-modules");

const lib = path.resolve(__dirname, "..", "..", "lib");
const packages = path.resolve(__dirname, "..", "..", "packages");

const potentialDependencies = [
  ...glob.sync(`${packages}/*/package.json`),
  ...glob.sync(`${lib}/**/pkg/package.json`),
].map((fileName) => {
  try {
    return JSON.parse(fs.readFileSync(fileName, "utf-8")).name;
  } catch (error) {
    console.log(error);
  }
});

console.log("Detected the following local packages", potentialDependencies);

// Tell webpack to compile the "bar" package, necessary if you're using the export statement for example
// https://www.npmjs.com/package/next-transpile-modules
const withTM = transpileModules(potentialDependencies);

module.exports = withTM();
