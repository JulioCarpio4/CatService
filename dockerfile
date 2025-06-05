FROM node:22-alpine AS build

#Create app directory
WORKDIR /app

#Copy app dependencies
COPY package*.json ./

#Install app dependencies
RUN npm install

#Copy source code
COPY . .
COPY .env ./

RUN npm run build

FROM node:22 as production

WORKDIR /app


COPY /package*.json ./
RUN npm ci --only=production
COPY --from=build /app/dist ./dist

#Expose port and run server.
EXPOSE ${PORT}
CMD ["node", "dist/app/index.js"]