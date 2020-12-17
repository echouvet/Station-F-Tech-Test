FROM node:10

WORKDIR /usr/src

COPY package*.json ./

RUN npm install
#RUN


EXPOSE 8080

CMD ["npm", "run", "serve"]