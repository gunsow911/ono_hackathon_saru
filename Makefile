install:
	cp ./api/.env.example ./api/.env && \
	docker-compose run --rm web yarn install
	docker-compose run --rm api sh -c 'composer install && php artisan key:generate'
	docker-compose run --rm api chmod -R 777 storage
	docker-compose up -d
setup:
	@make migrate
	@make seed
migrate:
	docker-compose exec api php artisan migrate
seed:
	docker-compose exec api php artisan db:seed
test:
	@make test-api
	@make test-web
test-api:
	docker-compose exec api php artisan test
test-web:
	docker-compose exec web yarn test
coverage:
	docker-compose exec api ./vendor/bin/phpunit --coverage-html coverage
package-install:
	docker-compose run --rm web yarn install
	docker-compose run --rm api composer install
