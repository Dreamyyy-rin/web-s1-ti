FROM dunglas/frankenphp:php8.3

# ENV SERVER_NAME=your-domain-name.example.com
# If you want to disable HTTPS, use this value instead:
ENV SERVER_NAME=":80"

RUN install-php-extensions \
  pgsql \
  pdo_pgsql \
  zip \
  intl \
  gd \
  opcache

# Enable PHP production settings
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

COPY backend/ /app

