import React from "react"

import { Shell } from "./Shell"

export function App({ children }: ReactProps) {
  return (
    <Shell>
      <section>
        <header>
          <h1>Start dropping your client app code here.</h1>
        </header>
        <p>Some rules for working in the app space:</p>
        <ul>
          <li>This is compiled via Create React App.</li>
          <li>This is meant for static, compiled apps.</li>
          <li>
            You can also use this as a staging ground for stories, or a test bed
            for alternate build targets, since it comes with a robust build and
            storybook toolchain.
          </li>
          <li>
            Some examples are: internal tools, things where SEO doesn't matter,
            tooling meant for electron apps, etc.
          </li>
          <li>
            For deployable sites, things meant to be shared or indexed by search
            engines, use the Next.js installation in the <code>apps/main</code>{" "}
            package.
          </li>
        </ul>
      </section>
    </Shell>
  )
}
