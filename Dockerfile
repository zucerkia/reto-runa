FROM --platform=linux/amd64 node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i 

EXPOSE 3000

CMD ["npm", "run", "dev:docker"]