
# Node version
FROM node:18

# Make work directory
WORKDIR /usr/src/app

# Copy files
COPY package*.json ./
COPY tsconfig.json ./
COPY . ./

# NPM install & build
RUN npm install
RUN npm run build

# POR define
EXPOSE 4000

# Set ENV variables
ENV PORT=4000
ENV DB_URL=
ENV JWT_SECRET=

# Open CMD & execute command
CMD [ "npm", "start"]