# Use a lightweight Node.js base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the application (if needed, e.g., for TypeScript)
RUN npm run build

# --- Production Stage ---
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy built artifacts from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose the port the API will run on
EXPOSE 3001

# Set environment variables (can be overridden by .env)
ENV NODE_ENV production

# Command to run the application
CMD ["node", "dist/index.js"]
