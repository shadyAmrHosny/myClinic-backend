FROM node:alpine

LABEL author="shady"

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN mkdir -p /.npm/_cacache && chown -R 1013690000:0 /.npm

COPY ./ ./

USER 1013690000

EXPOSE 3000

CMD ["npm", "start"]
