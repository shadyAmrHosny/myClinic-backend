# Use an official Node.js runtime as a parent image
FROM node:16.14

LABEL author="shady"

# Set the working directory in the container
WORKDIR /app

# Create and set ownership for the /npm directory
RUN mkdir -p /npm && chown -R 1000:1000 /npm

# Create and set ownership for the ~/.npm directory
RUN mkdir -p /home/node/.npm && chown -R 1000:1000 /home/node/.npm

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Set the user
USER 1000

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
