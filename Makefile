install:
	npm ci

gendiff:
	node bin/gendiff.js $(filepath1) $(filepath2) --format=$(or $(format),stylish)

help:
	node bin/gendiff.js --help

lint:
	npx eslint .