FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "run", "dev"]