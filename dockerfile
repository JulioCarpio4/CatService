FROM node:16

#Create app directory
WORKDIR /usr/src/app

#Copy app dependencies
COPY package*.json ./

#Install app dependencies
RUN npm install

#Copy source code
COPY . . /usr/src/app/
COPY .env ./

#Expose port and run server.
EXPOSE ${PORT}
CMD ["node", "src/index.js"]