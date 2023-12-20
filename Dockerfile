FROM  node:18-alpine
LABEL author="shady"
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
RUN mkdir cache && npm install -g npm@10.2.5 && npm config set cache ./cache --global && npm ci
RUN chown -R node /app && chmod -R 777 /app && chmod -R o+t /app  &&  User node

CMD ["npm", "start"]
