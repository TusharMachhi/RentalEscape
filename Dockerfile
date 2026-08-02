#BASE_STAGE

FROM node:24-alpine3.23 AS base

WORKDIR /app

COPY package.json package-lock.json ./

#DEVELOPMENT_STAGE

FROM base AS development

RUN npm install

COPY . . 

CMD ["npm", "run" ,"dev"]