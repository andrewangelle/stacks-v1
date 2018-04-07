FROM node:carbon

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src /app

EXPOSE 8080

CMD [ "node", "start.js" ]


