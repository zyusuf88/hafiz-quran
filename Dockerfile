FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production 
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/next.config.js ./
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm","run","start"]
