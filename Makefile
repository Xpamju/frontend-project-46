install:
	npm ci install
gendiff:
	node bin/gendiff.js $(ARGS) $(filepath1) $(filepath2)
