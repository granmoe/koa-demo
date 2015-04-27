#
# Init
#
FROM ubuntu:14.04
MAINTAINER John Hofrichter <john.hofrichter@gmail.com>
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

USER root
ENV HOME /root
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 0.12.2

#
# basic ubuntu utilities
#
RUN apt-get update && \
    apt-get install -m -y \
      curl \
      build-essential \
      libssl-dev \
      git \
      libxml2-dev \
      python \
      make \
      python-dev \
      locales \
      python-pip

#
# latest node && npm
#
RUN apt-get install -m -y python-software-properties
RUN apt-get install -m -y software-properties-common
RUN add-apt-repository ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get install -m -y  nodejs

#
# App setup
#
RUN cd /usr/bin/ && ls
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000



CMD ["node", "-v"]
# CMD ["npm", "start"]
