FROM node:16.14
WORKDIR /app
COPY package*.json ./

RUN npm install

RUN if [ ! -d "/.npm" ]; then mkdir /.npm; fi

RUN chown -R 1013690000:0 /.npm

USER 1013690000
COPY . .
CMD ["npm", "start"]
