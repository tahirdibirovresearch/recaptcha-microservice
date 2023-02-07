FROM node:18:alpine as build
WORKDIR /app
COPY ./package.json .
COPY ./tsconfig.json .
COPY ./yarn.lock .
COPY ./views .
COPY ./.env .
RUN yarn install
COPY ./src .
RUN yarn build
FROM node:18
WORKDIR /app
COPY --from=build /app/dist /app
CMD [ "yarn", "start" ]