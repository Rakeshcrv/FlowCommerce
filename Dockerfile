FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm i --omit=dev

COPY --from=builder /app/.output ./.output

EXPOSE 3000

CMD ["npm", "start"]
