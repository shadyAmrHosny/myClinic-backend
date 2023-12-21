FROM  node:alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./ ./
EXPOSE 8080
RUN chown -R node:node /usr/src/app
USER node
CMD ["npm", "start"]
