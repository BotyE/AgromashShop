FROM node:16-alpine as build
WORKDIR /client
COPY . .
RUN npm run build
CMD ["npm", "start"]

