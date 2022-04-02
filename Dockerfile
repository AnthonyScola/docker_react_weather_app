FROM node:17
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV REACT_APP_LOCATION_NAME=Heidenheim
ENV REACT_APP_COORDS=[48.679615,10.153576]
ENV REACT_OW_API_KEY=a4755513bba8c114dcc6a4a09072a541
EXPOSE 3000
CMD ["npm", "start"]