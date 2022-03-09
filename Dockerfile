FROM openresty/openresty:1.13.6.2-2-alpine

### Uncomment this to copy all the nginx configuration file to docker image
ADD conf/site.conf /etc/nginx/conf.d/default.conf
ADD conf/whitelist.conf /etc/nginx/conf.d/whitelist.conf


### Uncomment this to pack your code into images
### Please take note about the nginx root folder 
ADD dist/ /var/www/html/dist