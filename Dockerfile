# Use an official Node.js runtime as a parent image
FROM node:alpine

LABEL author="shady"

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY ./ ./

# Set the user
USER 1001

# Expose the port the app runs on
EXPOSE 3000

# Run the application with npm cache clean
CMD ["sh", "-c", "npm cache clean --force && npm start"]
