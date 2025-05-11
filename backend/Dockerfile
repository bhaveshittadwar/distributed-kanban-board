FROM node:18
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src ./src
CMD ["npx","ts-node","src/index.ts"]
