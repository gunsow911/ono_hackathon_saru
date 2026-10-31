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
# ローカル .data (MySQL 8.0) を 8.4 経由で 9.7 へ上げる。8.0→9.x の直接アップグレードは不可のため2段階。
# 9.x で削除された mysql_native_password のアカウントは 8.4 段階で caching_sha2_password へ変換する
db-upgrade:
	docker compose stop db
	docker run --rm -d --name ono-db-upgrade -v $(CURDIR)/.data:/var/lib/mysql mysql:8.4 --mysql-native-password=ON
	until docker exec ono-db-upgrade mysqladmin ping -uroot -proot --silent 2>/dev/null; do sleep 3; done
	docker exec ono-db-upgrade mysql -uroot -proot -e "ALTER USER IF EXISTS 'root'@'%' IDENTIFIED WITH caching_sha2_password BY 'root'; ALTER USER IF EXISTS 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'root'; ALTER USER IF EXISTS 'user'@'%' IDENTIFIED WITH caching_sha2_password BY 'secret'; SELECT user,host,plugin FROM mysql.user;"
	docker stop ono-db-upgrade
	docker compose up -d --build db
