DC = docker compose

.PHONY: all build clean down up rebuild install
all: build up

build:
	$(DC) build

up:
	$(DC) up -d

rebuild: build down up

down:
	$(DC) down

clean:
	$(DC) down -v

install:
	chmod +x scripts/install-docker.sh
	# sudo scripts/install-docker.sh
	
	chmod +x scripts/install-zabbix-agent.sh
	# sudo scripts/install-zabbix-agent.sh
