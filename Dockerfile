FROM node:alpine

LABEL author="shady"

WORKDIR /app

# Copy only package files first to leverage Docker layer caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./ ./

# Create a directory for npm cache with correct permissions
RUN mkdir cache && chown -R node /app/cache

# Switch to the non-root user
USER node

# Set npm cache to the custom directory
RUN npm config set cache /app/cache --global

# Ensure the correct permissions for the application directory
RUN chmod -R 755 /app

CMD ["npm", "start"]
