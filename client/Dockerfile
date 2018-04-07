FROM node:carbon as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node" "app/scripts/build.js"]

# serve

FROM node:carbon as serve

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build .

CMD ["serve", "-s", "."]

EXPOSE 5000