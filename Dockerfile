FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN rm -rf node_modules

RUN npm install

EXPOSE 3000

CMD ["node", "src/server.js"]
