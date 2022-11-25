FROM node:16
WORKDIR application
COPY package*.json ./

RUN npm install

EXPOSE 3000
ENTRYPOINT ["npm", "start"]