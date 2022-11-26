FROM node:16
WORKDIR application
COPY package*.json ./

RUN npm install

EXPOSE 8080
ENTRYPOINT ["npm", "start"]