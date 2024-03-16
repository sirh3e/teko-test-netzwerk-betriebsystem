FROM node:21-slim

WORKDIR /usr/src/app

COPY app/package*.json ./
RUN npm install

COPY app/ ./

EXPOSE 3000
CMD [ "npm", "run", "start" ]