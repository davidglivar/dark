BABEL_CMD = node_modules/.bin/babel
MOCHA_CMD = node_modules/.bin/_mocha

.PHONY: build develop test test-watch

build:
	node $(BABEL_CMD) src --out-dir lib

develop:
	node $(BABEL_CMD) src --watch --out-dir lib

test:
	make build
	
	node $(MOCHA_CMD)

test-watch:
	node $(MOCHA_CMD) --watch
