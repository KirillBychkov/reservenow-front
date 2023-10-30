# Choose a base image that matches your project's requirements.
FROM node:18-alpine

WORKDIR /app

COPY package.json .

# Install project dependencies using Yarn.
RUN yarn install

COPY . .

CMD ["yarn", "dev"]
