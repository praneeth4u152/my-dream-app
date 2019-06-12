##my-angular-app
FROM mavenqa.got.volvo.net:18443/node:12.2.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build





