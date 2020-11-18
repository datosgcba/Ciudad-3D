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
COPY ./.env.development ./.env.development
RUN npm run build

### nginx state for serving content ###
FROM nginx:1.19-alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /frontend/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
