FROM node:10.15.3

LABEL MAINTAINER Chinedu Ekene Okpala <allstack@gmail.com>

WORKDIR /src

COPY package.json .

RUN npm i --quiet

COPY . .

RUN npm install pm2 -g

ENV NODE_ENV=$NODE_ENV

ENV PROD_DATABASE_URL=$PROD_DATABASE_URL
ENV DEV_DATABASE_URL=$DEV_DATABASE_URL
ENV TEST_DATABASE_URL=$TEST_DATABASE_URL

ENV PROD_DATABASE_NAME=$PROD_DATABASE_NAME
ENV DEV_DATABASE_NAME=$DEV_DATABASE_NAME
ENV TEST_DATABASE_NAME=$TEST_DATABASE_NAME

ENV SECRET=$SECRET
ENV EXPIRESIN=$EXPIRESIN

ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

ENV NODEMAILER_PASS=$NODEMAILER_PASS

ENV PORT=$PORT

EXPOSE $PORT

CMD ["pm2-runtime", "start", "src/app.js"]