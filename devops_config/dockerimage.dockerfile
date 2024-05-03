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

WORKDIR /var/www/html

EXPOSE 80

#for docker setup only
#elboyo built-for