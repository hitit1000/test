# FROM nginx

# ENV TZ Asia/Seoul

# RUN mkdir /app

# WORKDIR /app

# RUN mkdir ./build

# COPY ./build /app/build/

# RUN rm /etc/nginx/conf.d/default.conf

# COPY ./nginx.conf /etc/nginx/conf.d

# CMD ["nginx", "-g", "daemon off;"]


FROM node:16-alpine
# 베이스 이미지 
ENV TZ Asia/Seoul
# 서울시간 입력
RUN mkdir /app
# 경로 생성
WORKDIR /app
# 경로 선택
COPY package.json package-lock.json .env ecosystem.config.js tsconfig.json ./
# 파일 복사 ( 현재 경로인 app으로 )

COPY src ./src
COPY template ./template
# 폴더 복사 ( 현재 경로인 app으로 )

ENV DB_HOST 127.0.0.1
ENV DB_PORT 3306
ENV DB_USER root
ENV DB_PASSWORD milkmilk
ENV DB_DATABASE terms
ENV ACCESS_TOKEN_SECRET zukEaeXprY/F6gxS6SZvCsnH6a1Xi2inJuWqqzsnNDIGfbDgydQ5N65VYHJUK+UNlI/gEaKtCHSHpO93OH1hGQ==
ENV REFRESH_TOKEN_SECRET vWYstFG/19R4rxk1gmQzkAX4+mzvq3QEd39Af7Z3Ku8PDy5b9HqvVRtX9GMvEkU4Fldv2fBziCMa0o7+7xQ6Bw==

RUN npm ci
# npm install의 경우 최신 버전으로 설치됨 / ci -> package-lock.json의 버전으로 설치
# RUN npm i -g pm2
RUN npm run build
# RUN pm2 start
# ENTRYPOINT [ "pm2-runtime", "start"]
# CMD ["pm2-runtime","start"]
CMD ["npm","run","dev"]