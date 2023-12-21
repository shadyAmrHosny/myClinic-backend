FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files to leverage Docker layer caching
COPY package*.json ./

# Create a directory for npm cache with correct permissions
RUN mkdir -p /.npm && chown -R node:node /.npm

# Switch to the non-root user
USER node

# Specify a custom directory for npm cache
RUN npm config set cache /home/node/app/.npm-cache --global

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port if your application is listening on a specific port
# EXPOSE 8080

# Define the command to start your application
CMD ["npm", "start"]
