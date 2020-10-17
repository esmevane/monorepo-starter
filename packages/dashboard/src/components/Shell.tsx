import React from "react"
import { Router } from "react-router-dom"

import { createHistory } from "create-history"

export function Shell(props: ReactProps) {
  return (
    <Router history={createHistory()}>
      <>{props.children}</>
    </Router>
  )
}
