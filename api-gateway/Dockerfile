FROM node:20-alpine
WORKDIR /app

# copy package.json first for caching
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
