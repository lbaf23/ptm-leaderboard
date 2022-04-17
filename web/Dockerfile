FROM node:16.13.0 AS build

COPY package.json .
COPY yarn.lock .

WORKDIR /web

RUN yarn config set registry https://registry.npmmirror.com

RUN yarn install
COPY . .

RUN yarn add react-scripts

RUN yarn build


FROM nginx

COPY --from=build /web/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 12001
