FROM node:20
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
COPY . .
RUN npm run build
# for production 
# CMD ["npm","start"] 
CMD ["npm","run","dev"] 

# for devlopment nd it use when we mount and when we make it for watch mode  

# diffrent between cmd and run : basically cmd when all builds complete and Run when its runtime installation