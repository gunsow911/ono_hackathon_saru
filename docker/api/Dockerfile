FROM php:8.1-fpm-alpine3.16

ENV APP_ENV=production
ENV COMPOSER_ALLOW_SUPERUSER 1

# install Lib
RUN apk update && \
    apk add --no-cache git zip unzip libjpeg-turbo-dev libpng-dev icu-dev libzip-dev autoconf build-base oniguruma-dev

# add docker extension
RUN docker-php-ext-configure gd --with-jpeg=/usr/include/
RUN docker-php-ext-install pdo_mysql mysqli gd intl zip opcache bcmath

# php.conf php-fpm.conf
COPY ./docker/api/conf/php.ini /usr/local/etc/php/php.ini
COPY ./docker/api/conf/docker.conf /usr/local/etc/php-fpm.d/docker.conf

# install Composer
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer && \
    chmod +x /usr/local/bin/composer

WORKDIR /app

COPY ./api .

RUN /usr/local/bin/composer install --optimize-autoloader --no-dev

RUN php artisan route:cache

RUN chmod -R 777 ./storage

EXPOSE 9000
