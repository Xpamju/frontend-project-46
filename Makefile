install:
	npm ci install
gendiff:
	node bin/gendiff.js $(ARGS) $(filepath1) $(filepath2)

gendiff -h:
	./bin/gendiff.js -h
	
lint:
	npx eslint .