default: start

dashboard: install
	yarn workspace dashboard start

install: wasm-build
	yarn install

main: install
	yarn workspace main dev

start: main

storybook:
	yarn workspace dashboard storybook

wasm-build: 
	find lib -type d -depth 1 -exec wasm-pack build "{}" ";"

yarn-build: install
	yarn build

