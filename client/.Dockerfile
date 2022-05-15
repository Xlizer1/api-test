FROM node:lts-slim
RUN mkdir /app
WORKDIR /app
COPY package.json ./
RUN npm install 
COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev"]