FROM node:14

WORKDIR /app
ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH

COPY . .
RUN npm install -g serve && \
    npm install && \
    npm run build

CMD [ "serve", "-s", "build", "-l", "tcp://0.0.0.0:3000" ]