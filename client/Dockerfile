FROM nginx

ENV TZ Asia/Seoul

RUN mkdir /app

WORKDIR /app

RUN mkdir ./build

COPY ./build /app/build/

RUN rm /etc/nginx/conf.d/default.conf

RUN rm /etc/nginx/nginx.conf

COPY ./nginx.conf /etc/nginx

CMD ["nginx", "-g", "daemon off;"]
