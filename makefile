.PHONY: init

# install all node modules
init:
	${INFO} "Install all node modules"
	@ npm install
	${INFO} "Make the module globally available"
	@ npm link
	${INFO} "Done"

# Cosmetics - color echo command output.
YELLOW := "\e[1;33m"
NC := "\e[0m"

# Shell Functions
INFO := @bash -c '\
	printf $(YELLOW); \
	echo "=> $$1"; \
	printf $(NC)' SOME_VALUE
