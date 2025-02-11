import React from "react"
import ReactDOM from "react-dom"

import { App } from "components"
import * as OtherPackage from "example-package"
import * as serviceWorker from "service-worker"

import "./index.css"

OtherPackage.exampleFunction()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
