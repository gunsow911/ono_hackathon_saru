# 前提条件

### 以下をインストール済みであること

- [docker(docker-compose)](https://docs.docker.com/)

# インストール

```shell
git clone git@github.com:gunsow911/ono_hackathon_saru.git
cd ono_hackathon_saru
make install
make setup
```

`make setup`のタイミングによっては、DB が起動中であるため、エラーが起きる場合があります。
時間をおいてから`make setup`を再度実行してください、

# アプリケーション開始

```shell
docker-compose up -d
```

# アプリケーション終了

```shell
docker-compose down
```

# フロントエンドサーバへ shell で入る

コンテナを立ち上げていない場合

```shell
docker-compose run --rm web sh
```

コンテナを立ち上げている場合

```shell
docker-compose exec web sh
```

# バックエンドサーバへ shell で入る

コンテナを立ち上げていない場合

```shell
docker-compose run --rm api sh
```

コンテナを立ち上げている場合

```shell
docker-compose exec api sh
```

### フロントエンドビルド確認

```shell
docker-compose exec web yarn build
```

# データベースのマイグレーション
データベースの更新は、Laravelのマイグレーション機能を利用して更新します。
マイグレーションを行うためには、apiコンテナ内で、以下コマンドを実行してください。
```sh
php artisan migrate
```
その他にも、マイグレーションのロールバックなどが可能です。詳しくは以下URLを参照してください。
https://readouble.com/laravel/9.x/ja/migrations.html

# 管理者ユーザの作成
apiコンテナ内で、以下コマンドを実行してください。
管理者ユーザが作成されます。
```sh
php artisan admin_user:create {ユーザ名} {メールアドレス} {パスワード}
```
