FROM node:10.15.3


LABEL MAINTAINER Chinedu Ekene Okpala <chinedu.okpala@completefarmer.com>

WORKDIR /src

COPY package.json .

RUN npm i --quiet

COPY . .

RUN npm install pm2 -g

EXPOSE 8000

CMD ["pm2-runtime", "start", "src/start.js"]