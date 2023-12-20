FROM node:alpine
LABEL author="shady"

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
USER 1001

CMD ["npm", "start"]
