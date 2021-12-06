# FROM public.ecr.aws/lambda/nodejs:14

# COPY index.js ./
# COPY package*.json ./
# ADD configs ./configs

# RUN npm install 

# FROM node:12.20.0-alpine3.10
FROM node:14-alpine3.10
RUN apk update
RUN apk add curl vim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g serverless
RUN npm install serverless-offline --save-dev
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npx", "serverless", "offline", "--host", "0.0.0.0"  ]
