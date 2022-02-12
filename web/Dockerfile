FROM --platform=${TARGETPLATFORM:-linux/amd64} ghcr.io/openfaas/of-watchdog:0.9.2 as watchdog
FROM --platform=${TARGETPLATFORM:-linux/amd64} node:16-alpine AS build

WORKDIR /root

COPY ./package.json ./

# set taobao yarn registry
RUN yarn config set registry https://registry.npm.taobao.org --global

RUN yarn
COPY . .
RUN yarn build


FROM --platform=${TARGETPLATFORM:-linux/amd64} nginxinc/nginx-unprivileged:1.20-alpine AS runtime
USER root
COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog

WORKDIR /usr/share/nginx/html
COPY --from=build /root/build .

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
RUN echo -n "daemon off;" | tee -a /etc/nginx/nginx.conf

ENV fprocess="nginx"
ENV mode="http"
ENV upstream_url="http://127.0.0.1:8082"

RUN chown -R nginx:nginx *

USER nginx

CMD ["/usr/bin/fwatchdog"]