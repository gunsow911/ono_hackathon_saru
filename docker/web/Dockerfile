FROM node:14.17-alpine

WORKDIR /web

COPY ./web .

RUN yarn install && yarn build

EXPOSE 3000

CMD ["yarn", "start"]
