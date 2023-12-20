FROM node:alpine

LABEL author="shady"
WORKDIR /app

RUN mkdir -p /.npm

RUN chown -R 1001:0 /.npm

COPY package*.json ./

RUN npm install

COPY ./ ./

USER 1001

EXPOSE 3000

CMD ["npm", "start"]
