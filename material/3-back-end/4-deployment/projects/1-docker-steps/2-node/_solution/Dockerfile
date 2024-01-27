# We are using a slightly older Node version (18), as
# we want to use the same version as we do in the material.
# Node 20 has slightly higher OS version requirements, so
# that is why we are using Node 18. It does not make any
# difference for this project.
FROM node:18.19.0-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
