FROM node:18

WORKDIR /src/app

COPY package*.json .

RUN npm install

COPY . .

ARG PORT=8000

ENV PORT=$PORT

EXPOSE $PORT

CMD ["npm", "run", "dev"]