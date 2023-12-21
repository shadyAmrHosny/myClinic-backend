FROM  node:alpine
LABEL author="shady"
WORKDIR /app
COPY package.json ./
RUN npm install

RUN if [ ! -d "/.npm" ]; then mkdir /.npm; fi
RUN chown -R 1008230000:0 /.npm
USER 1008230000
COPY . .

CMD ["npm", "start"]
