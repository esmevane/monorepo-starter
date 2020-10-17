import * as TestingLibrary from "@testing-library/react"
import React from "react"

import { Shell } from "components/Shell"

export const renderWithAppShell = async (ui: any) => {
  return { ...TestingLibrary.render(<Shell>{ui}</Shell>) }
}

export const cleanup = TestingLibrary.cleanup
