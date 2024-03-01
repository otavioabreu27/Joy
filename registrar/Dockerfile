# Stage 1: Build Stage
FROM golang:1.20-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o app .

# Stage 2: Run Stage
FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/app .

RUN apk update && apk add bash

COPY wait-for-it.sh .

CMD ["bash", "./wait-for-it.sh", "nats:4222", "--", "./app"]
