FROM node:10.19.0-stretch-slim as build

WORKDIR /src/app

COPY . .

RUN apt update && apt install -y python3-dev build-essential

RUN yarn install

FROM node:10.19.0-alpine AS production

WORKDIR /src/app

COPY --from=build /src/app .

ENTRYPOINT ["yarn", "start"]