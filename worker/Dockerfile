FROM node:24-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --no-strict-ssl
COPY . .
CMD ["npm", "run", "dev"]
