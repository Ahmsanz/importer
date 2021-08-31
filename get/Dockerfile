FROM node:14.17.5-alpine3.14

WORKDIR /adrian/get/src/

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build

COPY ./src ./dist

CMD ["node", "dist/main"]