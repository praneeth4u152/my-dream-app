FROM mavenqa.got.volvo.net:18443/node:latest as node
WORKDIR /usr/src/app
COPY package*.json ./

# set environment variables
ENV http_proxy http://a239123:password7@pxblr1.blr.volvo.net:8080/
ENV https_proxy http://a239123:password7@pxblr1.blr.volvo.net:8080/
# set proxy
RUN npm config -g set proxy ${http_proxy}
RUN npm config -g set https-proxy ${https_proxy}


RUN npm install
COPY . .
RUN npm run build

FROM mavenqa.got.volvo.net:18443/nginx:1.12.2
RUN rm /etc/nginx/conf.d/default.conf 

COPY --from=node /usr/src/app/dist/my-dream-app /usr/share/nginx/html

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder

COPY --from=node /usr/src/app/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

#RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx /etc/nginx/
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 4200
