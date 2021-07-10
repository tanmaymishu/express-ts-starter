FROM node:lts-alpine
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN yarn install
COPY . ./
CMD ["yarn", "start"]