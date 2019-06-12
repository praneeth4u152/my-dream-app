##my-angular-app
FROM mavenqa.got.volvo.net:18443/node:12.2.0

## Remove default nginx website
## RUN rm -rf /usr/share/nginx/html/*


RUN rm /etc/nginx/conf.d/default.conf 

COPY dist/my-dream-app/ /usr/share/nginx/html/

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx /etc/nginx/
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 4200





