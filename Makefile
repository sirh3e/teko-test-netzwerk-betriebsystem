DC = docker-compose

build:
	$(DC) build

up:
	$(DC) up -d

rebuild: build down up

down:
	$(DC) down

clean:
	$(DC) down -v

all: build up

.PHONY: all build clean down up rebuild
