
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
ENV DB_URL=mongodb+srv://mamun:ptWFmo8Hl7bXybaE@cluster0.vxoak.mongodb.net/colozai-auth
ENV JWT_SECRET=404E635266556A586E3272357538782F7638792F423F4428472B4B6250655368xysfsdf

# Open CMD & execute command
CMD [ "npm", "start"]