DC = docker-compose

build:
	$(DC) build

up:
	$(DC) up -d

clean:
	$(DC) down -v

all: build up

.PHONY: build up clean clean-volumes
