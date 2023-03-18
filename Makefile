install:
	npm ci install
gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run