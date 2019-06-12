FROM mavenqa.got.volvo.net:18443/node:latest
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
