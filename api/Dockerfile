FROM node:16

WORKDIR /opt/

COPY ./package.json ./
COPY ./yarn.lock ./

ENV NODE_ENV production
RUN yarn install

COPY . .

EXPOSE 1337

CMD ["yarn", "start"]
