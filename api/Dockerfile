FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --no-strict-ssl

COPY . .

CMD ["npm", "run", "dev"]