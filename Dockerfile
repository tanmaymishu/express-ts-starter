FROM node:lts-alpine
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then yarn install; \
    else npm install -g typescript &&  yarn install --only=production; \
    fi
COPY . ./
CMD ["yarn", "start"]