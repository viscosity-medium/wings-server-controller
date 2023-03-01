FROM node:alpine

WORKDIR /usr/src/wings-server-controller

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 9019:9019 9021:9021/udp 8151:8151/udp

#CMD [""]

CMD ["npm", "run", "dev"]

# docker build -t wings-server-controller .
# docker run -t -i wings-server-controller

# docker save -o _docker-build/wings-server-controller.tar wings-server-controller

# docker images
# docker image rm f5bd9733278d -f

# DELETE ALL IMAGES!
# docker rmi -f $(docker images -aq)

# sudo  docker cp tender_knuth:/usr/src/wings-server-controller .