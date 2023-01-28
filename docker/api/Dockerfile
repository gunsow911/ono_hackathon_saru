# Use the official Node.js 10 image.
# https://hub.docker.com/_/node
FROM node:10
# Create and change to the app directory.
WORKDIR /usr/src/app
# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY api/package.json api/package*.json ./api
# Install production dependencies.
RUN yarn install
# Copy local code to the container image.
COPY ./api .
# Run the web service on container startup.
CMD [ "yarn", "start" ]
