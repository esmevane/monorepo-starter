import * as History from "history"

const history =
  process.env.NODE_ENV === "test"
    ? History.createMemoryHistory()
    : History.createBrowserHistory()

export function createHistory() {
  return history
}
