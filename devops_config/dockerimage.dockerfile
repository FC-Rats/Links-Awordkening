#Version2.3
#BlitzWoof!
#awooo.fr

FROM php:apache

RUN apt-get update && apt-get install -y openjdk-17-jre
RUN docker-php-ext-install pdo_mysql

RUN apt-get -y install locales
ENV LANG fr_FR.UTF-8
ENV LC_ALL fr_FR.UTF-8

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g npm@10.4.0

RUN apt-get update && apt-get install -y build-essential wget zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev

WORKDIR /usr/src
RUN wget https://www.python.org/ftp/python/3.12.3/Python-3.12.3.tgz
RUN tar xvf Python-3.12.3.tgz
WORKDIR /usr/src/Python-3.12.3
RUN ./configure --enable-optimizations
RUN make -j $(nproc)
RUN make install

WORKDIR /usr/src
RUN rm -rf Python-3.12.3 Python-3.12.3.tgz
RUN apt-get purge -y build-essential wget
RUN apt-get autoremove -y

# Configuration apache spécifique au htaccess
RUN a2enmod rewrite
RUN echo '<Directory /var/www/html/>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>' > /etc/apache2/conf-available/allow-override.conf

RUN a2enconf allow-override

# RUN npm install -g serve
# Installe serve si nécessaire

# Configurer Apache pour servir depuis /var/www/html/frontend/build/
# RUN mkdir -p /var/www/html/frontend/build
# RUN echo '<VirtualHost *:80>\n\
#     DocumentRoot /var/www/html/frontend/build\n\
#     <Directory /var/www/html/frontend/build>\n\
#         Options Indexes FollowSymLinks\n\
#         AllowOverride All\n\
#         Require all granted\n\
#     </Directory>\n\
#     ErrorLog ${APACHE_LOG_DIR}/error.log\n\
#     CustomLog ${APACHE_LOG_DIR}/access.log combined\n\
# </VirtualHost>' > /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html/

EXPOSE 80

#for docker setup only
#elboyo built-for