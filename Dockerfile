FROM node:lts-alpine
WORKDIR /app
COPY package.json .
RUN yarn install
RUN yarn install --only=dev
COPY . ./
CMD ["yarn", "start"]