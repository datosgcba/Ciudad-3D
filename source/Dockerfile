# Multi-stage
# 1) building frontend app
# 2) nginx server

### Name the node stage "builder" ###
FROM node:12-alpine AS builder
# Set working directory
WORKDIR /frontend

# install node modules
COPY ./package.json .
COPY ./package-lock.json .
RUN npm i

# App files
COPY ./src ./src
COPY ./public ./public 
COPY ./jsconfig.json .

# build for development
COPY ./.env ./.env
RUN npm run build

### apache state for serving content ###
FROM httpd:2.4-alpine
# Set working directory to server asset directory
WORKDIR /usr/local/apache2/htdocs/
# Copy static assets from builder stage
COPY --from=builder /frontend/build .
