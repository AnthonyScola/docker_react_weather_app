FROM node:17
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV REACT_APP_LOCATION_NAME=Heidenheim
EXPOSE 3000
CMD ["npm", "start"]