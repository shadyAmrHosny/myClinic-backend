FROM node:alpine

LABEL author="shady"

WORKDIR /app

# Create a directory for npm cache with correct permissions
RUN mkdir -p /app/cache && chown -R node:node /app

# Switch to the non-root user
USER node

# Copy only package files first to leverage Docker layer caching
COPY package.json package-lock.json* ./

# Set npm cache to the custom directory
RUN npm config set cache /app/cache --global

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./ ./

CMD ["npm", "start"]
