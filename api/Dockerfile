FROM golang:alpine AS build

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64 \
	GOPROXY="https://goproxy.cn,direct"
	
WORKDIR /home/app

COPY . .

RUN go build -o app .

FROM alpine:3.14 AS deploy

WORKDIR /home/app

COPY --from=build /home/app .

EXPOSE 12001

CMD ["./app"]
