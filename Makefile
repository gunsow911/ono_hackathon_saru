install:
	cp ./api/.env.example ./api/.env && \
	cp ./.env.example ./.env && \
	docker compose run --rm web yarn install
	docker compose run --rm api sh -c 'composer install && php artisan key:generate'
	docker compose run --rm api chmod -R 777 storage
	docker compose up -d
setup:
	@make migrate
	@make seed
migrate:
	docker compose exec api php artisan migrate
seed:
	docker compose exec api php artisan db:seed
test:
	@make test-api
	@make test-web
test-api:
	docker compose exec api php artisan test
test-web:
	docker compose exec web yarn test
coverage:
	docker compose exec api ./vendor/bin/phpunit --coverage-html coverage
package-install:
	docker compose run --rm web yarn install
	docker compose run --rm api composer install
# ローカル .data (MySQL 8.0) を 8.4 へ上げる。本番 RDS は 8.4 が上限のためローカル/CI も 8.4 に揃える。
# 8.4 では mysql_native_password が既定で無効なため、変換してから本来のイメージで起動する
db-upgrade:
	docker compose stop db
	docker run --rm -d --name ono-db-upgrade -v $(CURDIR)/.data:/var/lib/mysql mysql:8.4 --mysql-native-password=ON
	until docker exec ono-db-upgrade mysqladmin ping -uroot -proot --silent 2>/dev/null; do sleep 3; done
	docker exec ono-db-upgrade mysql -uroot -proot -e "ALTER USER IF EXISTS 'root'@'%' IDENTIFIED WITH caching_sha2_password BY 'root'; ALTER USER IF EXISTS 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'root'; ALTER USER IF EXISTS 'user'@'%' IDENTIFIED WITH caching_sha2_password BY 'secret'; SELECT user,host,plugin FROM mysql.user;"
	docker stop ono-db-upgrade
	docker compose up -d --build db
