FROM node:18

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

COPY src ./src

RUN npx tsc  # Compile TS to JS in dist/

CMD ["node", "dist/index.js"]