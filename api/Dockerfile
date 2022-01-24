FROM --platform=${TARGETPLATFORM:-linux/amd64} ghcr.io/openfaas/of-watchdog:0.9.2 as watchdog
FROM --platform=${BUILDPLATFORM:-linux/amd64} golang:1.16-alpine3.14 as build

ARG TARGETPLATFORM
ARG BUILDPLATFORM
ARG TARGETOS
ARG TARGETARCH

RUN apk --no-cache add git

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog

ENV CGO_ENABLED=0

RUN mkdir -p /go/src/handler
WORKDIR /go/src/handler
COPY . .

ARG GOPROXY=""
ARG GOFLAGS=""
ARG DEBUG=0

WORKDIR /go/src/handler/function

WORKDIR /go/src/handler
RUN CGO_ENABLED=${CGO_ENABLED} GOOS=${TARGETOS} GOARCH=${TARGETARCH} \
    go build --ldflags "-s -w" -a -installsuffix cgo -o handler .


FROM --platform=${TARGETPLATFORM:-linux/amd64} alpine:3.14
RUN apk --no-cache add ca-certificates \
    && addgroup -S app && adduser -S -g app app
RUN mkdir -p /home/app \
    && chown app /home/app

WORKDIR /home/app

COPY --from=build --chown=app /go/src/handler/handler    .
COPY --from=build --chown=app /usr/bin/fwatchdog         .
COPY --from=build --chown=app /go/src/handler/function/  .

USER app

ENV fprocess="./handler"
ENV mode="http"
ENV upstream_url="http://127.0.0.1:8000"
ENV prefix_logs="false"

CMD ["./fwatchdog"]