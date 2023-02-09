DIR = scripts
DC = docker-compose

bootstrap:
	$(DC) up -d influxdb grafana
k6-test: 	 
	$(DC) run k6 run /${DIR}/$(test).js
clean:
	$(DC) down -v
clean_all:
	$(DC) down -v --rmi all
test:
	$(DC) run k6 run /${DIR}/concreteAI.js
.PHONY: k6-test clean clean_all test