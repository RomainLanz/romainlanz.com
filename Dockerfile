FROM node:lts-bookworm-slim AS base
WORKDIR /app
RUN apk --no-cache add curl

# Base installer
FROM base AS installer
RUN corepack enable
COPY . .

# All deps stage
FROM installer AS deps
RUN yarn workspaces focus @rlanz/site

# Production only deps stage
FROM installer AS production-deps
RUN yarn workspaces focus @rlanz/site --production

# Build stage
FROM installer AS build
COPY --from=deps /app/node_modules /app/node_modules
WORKDIR /app/apps/romainlanz.com
RUN node ace build --ignore-ts-errors

# Production stage
FROM base
ENV NODE_ENV=production
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/apps/romainlanz.com/build /app
EXPOSE 8080
CMD ["node", "./bin/server.js"]
