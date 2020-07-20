FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci --only=production
# If you are building your code for production
# RUN npm ci --only=production

# psql
RUN apt-get update && apt-get install -y postgresql-client

# redis
RUN apt-get install redis-server -y
# Bundle app source
COPY . .

# Migrating
# RUN npx sequelize-cli db:migrate --env production

# Seeding
# RUN npx sequelize-cli db:seed:all --env production

EXPOSE 80
ENTRYPOINT ["node", "app.js"]