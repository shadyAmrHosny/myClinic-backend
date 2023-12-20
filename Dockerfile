# Use an official Node.js runtime as a parent image
FROM node:alpine

LABEL author="shady"

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Clean npm cache
RUN npm cache clean --force

# Install app dependencies
RUN npm install

# Bundle app source
COPY ./ ./

# Expose the port the app runs on
EXPOSE 3000

# Set the user
USER 1001

# Run the application
CMD ["npm", "start"]
