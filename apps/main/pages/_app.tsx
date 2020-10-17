import { AppProps } from "next/app";
import { useEffect } from "react";

import * as ExamplePackage from "example-package";

import "styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("example-wasm").then((check) => console.log(check.adds_two(5)));
    ExamplePackage.exampleFunction();
  }, []);
  return <Component {...pageProps} />;
}

export default App;
