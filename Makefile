install:
	npm ci install
gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run
make lint:
	npx eslint .
make test:
	npm run test