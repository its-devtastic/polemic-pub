FROM node:14-buster

WORKDIR /opt/

COPY ./package.json ./
COPY ./yarn.lock ./

ENV NODE_ENV production
RUN yarn install

COPY . .

EXPOSE 1337

CMD ["node", "node_modules/@strapi/strapi/bin/strapi", "start"]
