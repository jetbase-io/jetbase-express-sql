FROM node:12.14.1
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm install
COPY . .
ENV NODE_ENV=development
ENV PORT=5000
ENV JWT_SECRET=secret
ENV DB_USER_DEV=postgres
ENV DB_PASSWORD_DEV=postgres
ENV DB_NAME_DEV=jetbase
ENV DB_HOST_DEV=db
CMD ["npm", "start"]