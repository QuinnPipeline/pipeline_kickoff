#!/bin/bash
echo -e "reached" >> status.txt
sudo su
wget http://nginx.org/keys/nginx_signing.key
apt-key add nginx_signing.key
echo -e "deb http://nginx.org/packages/ubuntu xenial nginx\ndeb-src http://nginx.org/packages/ubuntu xenial nginx" >>  /etc/apt/sources.list
apt-get update -y
wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl1.0/libssl1.0.0_1.0.2n-1ubuntu5_amd64.deb
apt-get install ./libssl1.0.0_1.0.2n-1ubuntu5_amd64.deb
apt-get install nginx
service nginx start