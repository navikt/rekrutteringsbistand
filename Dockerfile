FROM ghcr.io/navikt/baseimages/node-express:18

WORKDIR /var

COPY dist/ dist/
COPY server/build server/
COPY server/node_modules server/node_modules

WORKDIR /var/server

EXPOSE 8080
ENTRYPOINT ["node", "server.js"]
