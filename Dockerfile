FROM node:16-alpine

WORKDIR /app

COPY ./app /app

RUN npm install express body-parser pg

EXPOSE 3000

CMD ["node", "server.js"]