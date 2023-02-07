FROM node:18.13.0 as build
WORKDIR /app
COPY ./package.json .
COPY ./tsconfig.json .
COPY ./yarn.lock .
COPY ./.env .
RUN yarn install
RUN yarn add typescript
COPY ./src .
COPY ./views .
RUN npx tsc --project ./tsconfig.json
FROM node:18.13.0
WORKDIR /app
COPY --from=build /app/dist /app
CMD [ "yarn", "start" ]