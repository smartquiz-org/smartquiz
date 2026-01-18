# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build:prod

# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -S angular && adduser -S angular -G angular

# Copy built application
COPY --from=build /app/dist/smartquiz-frontend ./dist/smartquiz-frontend

# Set ownership
RUN chown -R angular:angular /app
USER angular

# Expose port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000 || exit 1

# Start SSR server
CMD ["node", "dist/smartquiz-frontend/server/server.mjs"]
