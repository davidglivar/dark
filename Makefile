BABEL_CMD = node_modules/.bin/babel
MOCHA_CMD = node_modules/.bin/_mocha

.PHONY: develop test

develop:
	node $(BABEL_CMD) src --watch --out-dir lib

test:
	node $(MOCHA_CMD) --watch
