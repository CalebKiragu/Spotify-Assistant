FROM node:alpine
COPY . /Spotify-Assistant
WORKDIR /Spotify-Assistant
CMD node index.js