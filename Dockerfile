FROM node:18-alpine as builder

COPY . .

RUN yarn install

RUN yarn build

FROM nginx:1.25.3-alpine as production-build

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
