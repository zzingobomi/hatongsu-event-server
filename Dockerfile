FROM node:20-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM node:20-alpine AS production

EXPOSE 2567/tcp

WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod

COPY --from=builder /app/build/ ./build/
ENV NODE_ENV=production

CMD ["node", "./build/index.js"]