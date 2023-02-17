FROM node:17-alpine AS runner
RUN apk update
WORKDIR /app
RUN npm i -g pnpm

COPY .gitignore .gitignore
COPY . .
RUN pnpm install
WORKDIR /app

# Creates a safe execution user group and user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 runner
USER runner

CMD ["pnpm", "ts-node", "/app/src/index.ts"]