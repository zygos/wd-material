FROM node:20.14.0-alpine3.20

WORKDIR /app

COPY package*.json ./

# install dependencies
RUN npm ci

COPY . .

# build JS files
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "prod"]
