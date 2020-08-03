FROM node:12-alpine
WORKDIR /yell
COPY . .
RUN npm i
EXPOSE 4242
ENTRYPOINT ["/docker-entrypoint.sh"]