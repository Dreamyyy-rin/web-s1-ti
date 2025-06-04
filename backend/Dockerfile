FROM dunglas/frankenphp:php8.3

WORKDIR /app

# ENV SERVER_NAME=your-domain-name.example.com
# If you want to disable HTTPS, use this value instead:
ENV SERVER_NAME=":80"

RUN apt-get update && apt-get install -y \
    postgresql-15 \
    postgresql-contrib-15 \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /var/lib/postgresql/data && chown -R postgres:postgres /var/lib/postgresql/data
USER postgres
RUN /usr/lib/postgresql/15/bin/initdb -D /var/lib/postgresql/data
# RUN pg_ctl -D /var/lib/postgresql/data start && \
#     psql --command "ALTER USER postgres WITH PASSWORD 'admin';" && \
#     # psql --command "ALTER USER postgres WITH PASSWORD '${POSTGRES_PASSWORD}';" && \
#     pg_ctl -D /var/lib/postgresql/data stop
USER root

RUN install-php-extensions \
  pgsql \
  pdo_pgsql \
  zip \
  intl \
  gd \
  opcache

RUN echo "host all all all md5" >> /etc/postgresql/15/main/pg_hba.conf
  
COPY <<'EOF' /start.sh
#!/bin/bash
service postgresql start
# Wait for PostgreSQL to start
until pg_isready; do
    echo "Waiting for PostgreSQL to start..."
    sleep 1
done
su - postgres -c "psql -c \"ALTER USER postgres WITH PASSWORD 'admin';\""
# Start FrankenPHP
exec frankenphp run --config /etc/frankenphp/Caddyfile --adapter caddyfile
EOF
  
RUN chmod +x /start.sh

# Enable PHP production settings
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

COPY . /app

EXPOSE 80

CMD ["/start.sh"]
