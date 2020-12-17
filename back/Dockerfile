FROM node:10

WORKDIR /usr/src

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
#RUN npm install -g nodemon
COPY . .
EXPOSE 3080
CMD [ "node", "server.js"]
