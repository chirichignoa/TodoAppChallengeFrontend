FROM node:11.6.0-alpine AS builder
COPY . ./frontend
WORKDIR /frontend
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /frontend/dist/frontend/ /usr/share/nginx/html