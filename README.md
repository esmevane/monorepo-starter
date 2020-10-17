# Wasm + React Monorepo Starter

## Requirements

- You will require `yarn` and a recent version of Node.
- You will need a recent version of rust, wasm-pack and the
  wasm32-unknown-unknown build target.

## Installation

Just clone the repo and run `make`. If you have `yarn`, `make`, and Rust /
`wasm-pack` installed but it takes more than that, raise an issue.

## Anatomy

This is pretty bare-bones, all-told. It comes with the following configurations:

- `apps` - Put any deployables here. There's a preinstalled Next.js kit
  preconfigured to leverage the Wasm / Packages already, and it should
  automatically pick up anything you put there.
- `lib` - Where your wasm packages can go.
- `packages` - Put typescript packages here. There's also an extended
  installation of Create React App in packages, meant mainly to provide a clear
  space to build out apps that don't need SEO or shareability.

Just about everything has been instrumented with React, Typescript, and Wasm in
mind: that's the intended happy path for the project at this time.

## Some workflows

These workflows are the ones I use when using this starter.

### Watch rust crates and compile on change

1. Install `cargo-watch`: `cargo install cargo-watch`
2. Run this command from the repo root: `cargo watch --shell "make wasm-build"`
3. Work on wasm code

### Make a new wasm crate

1. Copy `example-wasm` to a new folder in `lib`
2. Change the `Cargo.toml`

Or

1. Start a new crate in `lib`
2. Add `wasm-pack` dependencies from `example-wasm`'s `Cargo.toml`

### Make a new package

1. Initialize a new node package in `packages`
2. Make sure it has a `private` `package.json` config.
3. Add a `tsconfig.json` with the following contents:
   ```json
   {
     "extends": "../tsconfig.json"
   }
   ```

### Run Storybook

The CRA instance (the `dashboard` package) exists mainly to create a test bed or
storybook configuration, and maybe sometimes to create a static deployable app
provided you don't need stuff like SEO, share features or RSS support.

That said, it runs in much the same environment as the Next app, so if you'd
like to leverage storybook with any monorepo contents, it's your best spot to do
so.

To run it, simply:

```sh
make storybook
```
