FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN npm rebuild sqlite3 --build-from-source
EXPOSE 3000
CMD ["node", "server.js"]
