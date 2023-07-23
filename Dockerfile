FROM node:18-alpine

WORKDIR /user/scr/app

COPY . .

RUN npm install --production

RUN npm run build

CMD [ "npm", "start" ]