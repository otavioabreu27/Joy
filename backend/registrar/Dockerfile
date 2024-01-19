FROM golang:alpine3.19 AS builder

WORKDIR /app
COPY . .

RUN go build -o main

FROM alpine:3.19

WORKDIR /app
COPY --from=builder /app/main .

RUN apk update && apk update

RUN apk add bash

COPY ./wait-for-it.sh .
RUN chmod +x ./wait-for-it.sh

CMD ["bash", "./wait-for-it.sh", "rabbitmq:5672", "--", "./main"]
