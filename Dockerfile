FROM node:12.14.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD package.json /usr/src/app
RUN npm install
ADD . /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV=development
ENV PORT=3001
ENV JWT_SECRET=secret
ENV DB_USER_DEV=postgres
ENV DB_PASSWORD_DEV=postgres
ENV DB_NAME_DEV=CRM
ENV DB_HOST_DEV=127.0.0.1

EXPOSE 3001

CMD npm start