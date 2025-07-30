HANDMADE = old
DEST     = docs


.PHONY: build svelte

svelte: 
	npm run build

build: svelte
	cp -r old/. docs/