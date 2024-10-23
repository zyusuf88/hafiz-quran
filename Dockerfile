FROM node:18 AS build

WORKDIR /app


COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

# Production image
FROM node:18


WORKDIR /app

COPY --from=build /app/next.config.js ./
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules

# Expose the port your Next.js app runs on
EXPOSE 3000

# Command to run the Next.js application
CMD ["npm","run","start"]
